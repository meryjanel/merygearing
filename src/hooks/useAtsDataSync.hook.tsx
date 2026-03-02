import { FetchResult } from "@apollo/client";
import {
  atsDexieDbSchema,
  useAtsDexieContext,
} from "client/contexts/atsDexieContext";
import {
  useAllBiomeListMutation,
  useAllBuildingListMutation,
  useAllNodeListMutation,
  useAllResourceListMutation,
} from "client/generated/graphql";
import { IDexie, storeProps } from "client/lib/dexie";
import { stringToHash } from "client/lib/hash";
import { DATA_HASH_CHECK } from "hashcheck";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Hangul from "hangul-js";

// 데이터 싱크. 시작-서버에서온sha비교 --
// 데이터들 불러와서 하드 db에 담기
// 경량 db 만들기
// 완료

const mutationGqlKey = {
  biome: "allBiomeList",
  building: "allBuildingList",
  node: "allNodeList",
  resource: "allResourceList",
};

// 통짜 로딩으로 변경
// export type stateType =
//   | "start"
//   | "front_sha"
//   | "server_sha"
//   | "biome_loading"
//   | "building_loading"
//   | "node_loading"
//   | "resource_loading"
//   | "complete";

export const useAtsDataSync = () => {
  // db관련 전체로딩
  const [isSyncLoading, setIsSyncLoading] = useState<boolean>(true);
  // 최초 sync가 한번은 진행되었나 분기체크
  const isCompleted = useRef(false);

  const { t } = useTranslation("name");
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const [allBiomeListMutation] = useAllBiomeListMutation();
  const [allBuildingListMutation] = useAllBuildingListMutation();
  const [allNodeListMutation] = useAllNodeListMutation();
  const [allResourceListMutation] = useAllResourceListMutation();
  const mutationGql = {
    biome: allBiomeListMutation,
    building: allBuildingListMutation,
    node: allNodeListMutation,
    resource: allResourceListMutation,
  };

  const { db, isReady } = useAtsDexieContext();

  // 서버db -> indexed db -> 경량db
  const atsDataSyncLogic = async () => {
    // console.log("atsDataSyncLogic start");
    setIsSyncLoading(true);
    // 중량 디비 적재(해쉬값 비교해서 무결성체크 통과하면 서버x)
    for (const gqlKey of Object.keys(mutationGqlKey)) {
      // console.log(gqlKey, "쥐큐엘키");
      await syncTable(gqlKey, mutationGql[gqlKey]);
    }
    // 경량디비 적재(이는 항상 리셋)
    await migrateAllIndex();
    setIsSyncLoading(false);
    isCompleted.current = true;
    // console.log("atsDataSyncLogic end");
  };

  const syncTable = async (
    dbname: string,
    mutation: () => Promise<FetchResult>,
  ) => {
    const count = await db[dbname].count();
    // 테이블에 데이터 있는지 체크
    let needMutation = !count;

    if (!needMutation) {
      // 있다면 해쉬체크 무결성 오류 확인
      const data = JSON.stringify(await db[dbname].orderBy("id").toArray());
      const hash = await stringToHash(data);
      // console.log(dbname, "해쉬보기", hash);

      if (!DATA_HASH_CHECK[dbname] || DATA_HASH_CHECK[dbname] !== hash) {
        needMutation = true;
      }
    }
    if (needMutation) {
      // console.log(dbname, "서버갓다와요");
      const result = await mutation();
      const dataArray = result?.data[mutationGqlKey[dbname]];
      await db[dbname].bulkPut(dataArray);
    }
  };

  // 외부 컴포넌트용
  const migrateAllIndex = async () => {
    // console.log("migrateAllIndex start");
    setIsSyncLoading(true);
    const indexStores = atsDexieDbSchema.stores.filter((store) =>
      store.storename.includes("index"),
    );
    for (const indexStore of indexStores) {
      await migrateIndex(indexStore);
    }
    setIsSyncLoading(false);
    // console.log("migrateAllIndex end");
  };

  useEffect(() => {
    // 언어변경 일단 이대로
    if (isCompleted.current) migrateAllIndex();
  }, [locale]);

  const migrateIndex = useCallback(
    async (store: storeProps) => {
      const sourceStore = store.storename.split("_")[0];
      const indexStore = store.storename;
      const indexKeys = store.keyString
        ?.split(",")
        .map((key) => key.trim())
        .map((key) => key.replace("*", ""));

      // console.log(`${sourceStore}->${indexStore} 가공 시작...`);

      let batch = [];
      const BATCH_SIZE = 1000; // 1,000건씩 묶어서 저장 (성능 최적화)

      // 하나씩 순회
      await db[sourceStore].each(async (item) => {
        // 지정한 키값만 추출
        const picked = indexKeys.reduce((obj, key) => {
          // *** 여기 나중에 언어팩용 컬럼 추가.
          if (key in item) obj[key] = item[key];
          obj["name"] = t(item["id"]);

          if (locale === "ko" || locale === "koa") {
            const initial = Hangul.disassemble(t(item["id"]), true)
              .map((char) => char[0])
              .join("");
            obj["initial"] = initial;
          }

          return obj;
        }, {});

        batch.push(picked);

        // 배치가 차면 저장하고 비움
        if (batch.length >= BATCH_SIZE) {
          await db[indexStore].bulkPut(batch);
          batch = [];
        }
      });

      // 남은 데이터 처리
      if (batch.length > 0) {
        // console.log(batch, "뱃취");

        // json만들기용
        let indexString = {};
        batch.forEach((bat) => {
          const key = bat.id;
          const firstUnderscoreIndex = key.indexOf("_");

          const prefix = key.slice(0, firstUnderscoreIndex); // 'food'
          const restKey = key.slice(firstUnderscoreIndex + 1);
          // console.log(restKey, "레스트키");
          indexString[key] = restKey.replace(/_/g, " ");
        });
        // console.log(indexString);
        /////

        await db[indexStore].bulkPut(batch);
      }

      // console.log(`${sourceStore}->${indexStore} 완료!`);
    },
    [locale],
  );

  useEffect(() => {
    if (isReady) atsDataSyncLogic();
  }, [isReady]);

  return { db, isSyncLoading, migrateAllIndex };
};
