import Dexie from "dexie";
import { useEffect, useRef, useState } from "react";

export interface IuseDexihook {
  dbname: string;
  stores: storeProps[];
}

interface storeProps {
  storename: string;
  keyString?: string;
}

const useDexihook = ({ dbname, stores }: IuseDexihook) => {
  const [isReady, setIsReady] = useState(false);
  const db = new Dexie(dbname);

  const storeSync = async () => {
    try {
      console.log("디비 열기 시작");
      const storeOB = {};
      stores.forEach((store) => {
        storeOB[store.storename] = store.keyString || "id";
      });
      db.version(1).stores(storeOB);
      await db.open();
      const count = await db["biome"].count();
      console.log("디비 열었음", db, count);
      setIsReady(true);
    } catch (e) {
      console.log("useDexiehook Error : ", e);
    }
  };

  useEffect(() => {
    storeSync();
  }, []);

  return { db, isReady };
};

export default useDexihook;

// const saveLargeData = async (data) => {
//   try {
//     console.log(data, "데이타");
//     console.time("저장 시간");
//     await db.table("atsStore").bulkPut(data);
//     console.timeEnd("저장 시간2");
//   } catch (e) {
//     console.log("이런 에러발생 ", e);
//   }
// };

// const atsPage = () => {
//   useEffect(() => {
//     // saveLargeData(bulkdata);
//     const dd = db.table("atsStore").get({ index: 7 });
//     console.log(dd, "디디");
//   }, []);

//   return <Box>아주 바부다요</Box>;
// };

// export default atsPage;
