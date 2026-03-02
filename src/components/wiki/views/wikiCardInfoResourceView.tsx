import { Box, Tab, Tabs } from "@mui/material";
import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import React, { useCallback, useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import WikiNodeInfoModule from "../modules/wikiNodeInfo.module";
import WikiCardInfoResourceDetailView, {
  iwikiCardInfoResourceDetailView,
} from "./wikiCardInfoResourceDetailView";
import GrassIcon from "@mui/icons-material/Grass";
import CottageIcon from "@mui/icons-material/Cottage";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { WikiThumbnail } from "../modules/wikiThumbnail.modul";
import { symbolColors } from "client/themes/muiTheme";
import WikiResorceRecipeListView from "./wikiResorceRecipeListView";
import WikiResourceProcessBuildingList from "./wikiResourceProcessBuildingList";
import LoadingScreen from "client/components/common/views/loadingScreen";
import WikiRecipeTitle from "../modules/wikiRecipeTitle.module";

interface IwikiCardInfoResourceView {
  id: string;
  containerRef?: React.RefObject<any>;
  tabAnchorRef?: React.RefObject<any>;
}

// 채집 레시피 가공
export type tabType = "gathering" | "recipe" | "process";

const WikiCardInfoResourceView = React.memo(
  ({ id, containerRef, tabAnchorRef }: IwikiCardInfoResourceView) => {
    const { db } = useAtsDexieContext();
    const [resource, setResource] = useState<iwikiCardInfoResourceDetailView>(
      {} as iwikiCardInfoResourceDetailView,
    );
    const [nodeIds, setNodeIds] = useState([]);
    const [fetchLoding, setFetchLoading] = useState(true);
    const [processBuildingIds, setProcessBuildingIds] = useState([]);

    const [tabvalue, setTabValue] = useState("gathering");

    const fetchIndex = async () => {
      // 자원 상세정보
      const resourceFetchResult = await db["resource"]
        .where("id")
        .equals(id)
        .first();
      setResource({
        id: resourceFetchResult.id,
        type: resourceFetchResult.type,
        speciesPreference: resourceFetchResult.speciesPreference,
        productionBuildings: resourceFetchResult.productionBuildings,
      });

      // 타입따라서 탭의 위치 지정
      // 날음식, 공예품, 연료는 채집
      // 나머지는 레시피
      // ** 단 2가지 예외 "정화의 불"과 "고대 석판" 얘넨 규칙이 없음
      if (resourceFetchResult?.id === "res_purging_fire") setTabValue("recipe");
      else if (resourceFetchResult?.id === "res_ancient_tablet")
        setTabValue("gathering");
      else if (
        resourceFetchResult.type === "raw_food" ||
        resourceFetchResult.type === "crafting_material" ||
        resourceFetchResult.type === "fuel"
      )
        setTabValue("gathering");
      else {
        setTabValue("recipe");
      }

      // 노드 id정보
      const nodeFetchResult = await db["node_index"]
        .where("allResources")
        .equals(id)
        .toArray();
      setNodeIds(nodeFetchResult?.map((node) => node.id));

      const processBuildingFetchResult = await db["building_index"]
        .where("allIngredients")
        .equals(id)
        .toArray();
      setProcessBuildingIds(processBuildingFetchResult?.map((pb) => pb.id));

      setFetchLoading(false);
    };

    useEffect(() => {
      fetchIndex();
    }, []);

    // 탭 클릭시 발생하는 이벤
    const handTabChange = useCallback((event, newValue) => {
      setTabValue(newValue);

      setTimeout(() => {
        if (containerRef.current && tabAnchorRef.current) {
          // 타겟(tabAnchorRef)이 부모(scrollParentRef)로부터 얼마나 떨어져 있는지 계산
          const targetTop = tabAnchorRef.current.offsetTop;

          containerRef.current.scrollTo({
            top: targetTop,
            behavior: "auto",
          });
        }
      }, 50);
    }, []);

    // 레시피에 전해줄 빌딩ids 가공
    const recipeBuilidngIds = useMemo(() => {
      if (
        !resource?.productionBuildings ||
        resource?.productionBuildings?.length === 0
      )
        return [];

      //** */ 우선 캠프종류 다 제거
      return resource?.productionBuildings
        ?.filter((pb) => pb?.buildingType !== "camp")
        .map((pb) => pb?.id);
    }, [resource]);

    if (fetchLoding) return <LoadingScreen type={"simple"} />;

    return (
      <>
        {/* <Box width={"100px"} height={"500px"} bgcolor={"tomato"} /> */}
        {/* 간략설명 */}
        <WikiCardInfoResourceDetailView
          id={resource?.id}
          type={resource?.type}
          speciesPreference={resource?.speciesPreference}
          productionBuildings={resource?.productionBuildings}
        />
        {/* 탭 분할 */}
        {/* 스크롤 이슈로 스크롤용 앵커 */}
        <Tabs
          ref={tabAnchorRef}
          value={tabvalue}
          onChange={handTabChange}
          variant="fullWidth"
          sx={{
            border: 1,
            borderColor: "divider",
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 1972,
            mt: 3,
            minHeight: "48px",
          }}
        >
          <Tab
            disabled={nodeIds?.length === 0}
            icon={
              <>
                <GrassIcon />
                {tabvalue === "gathering" && (
                  <Box
                    ml={1}
                    borderRadius={2}
                    overflow={"hidden"}
                    width={"20px"}
                    sx={{
                      outline: `2px solid ${symbolColors["resource"]}`,
                    }}
                  >
                    <WikiThumbnail id={id} />
                  </Box>
                )}
              </>
            }
            value={"gathering"}
          />
          <Tab
            disabled={recipeBuilidngIds?.length === 0}
            icon={
              <>
                <CottageIcon />
                {tabvalue === "recipe" && (
                  <Box
                    ml={1}
                    borderRadius={2}
                    overflow={"hidden"}
                    width={"20px"}
                    sx={{
                      outline: `2px solid ${symbolColors["resource"]}`,
                    }}
                  >
                    <WikiThumbnail id={id} />
                  </Box>
                )}
              </>
            }
            value={"recipe"}
          />
          <Tab
            disabled={processBuildingIds?.length === 0}
            icon={
              <>
                <WarehouseIcon />
                {tabvalue === "process" && (
                  <Box
                    ml={1}
                    borderRadius={2}
                    overflow={"hidden"}
                    width={"20px"}
                    sx={{
                      outline: `2px solid ${symbolColors["resource"]}`,
                    }}
                  >
                    <WikiThumbnail id={id} />
                  </Box>
                )}
              </>
            }
            value={"process"}
          />
        </Tabs>
        {/* 탭 하부내용 */}
        <Box
          // 다이얼로그 높이 - 56 - 8 - 48 - 2
          // minHeight={{
          //   xs: "calc(95dvh - 56px - 8px - 48px - 2px)",
          //   sm: "calc(90dvh - 56px - 8px - 48px - 2px)",
          //   md: "calc(80dvh - 56px - 8px - 48px - 2px)",
          // }}
          // 높이 통일
          minHeight={"calc(95dvh - 56px - 8px - 48px - 2px)"}
        >
          {/* 노드(채집) */}
          {tabvalue === "gathering" && nodeIds?.length > 0 && (
            <>
              <WikiRecipeTitle recipeType={"gathering"} />
              <WikiNodeInfoModule nodeIds={nodeIds} primary={id} />
            </>
          )}
          {/* 제조소 */}
          {tabvalue === "recipe" && recipeBuilidngIds?.length > 0 && (
            <WikiResorceRecipeListView
              buildingIds={recipeBuilidngIds}
              resource={id}
            />
          )}
          {/* 가공소 */}
          {tabvalue === "process" && processBuildingIds?.length > 0 && (
            <WikiResourceProcessBuildingList
              buildingIds={processBuildingIds}
              resource={id}
            />
          )}
        </Box>
      </>
    );
  },
);

export default WikiCardInfoResourceView;
