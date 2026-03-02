import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import React, { useEffect, useMemo, useState } from "react";
import WikiCardInfoBuildingDetailView from "./wikiCardInfoBuildingDetailView";
import WikiNodeInfoModule from "../modules/wikiNodeInfo.module";
import { uuid } from "client/lib/uuid";
import WikiRecipeModule from "../modules/wikiRecipe.module";
import { Box } from "@mui/material";
import LoadingScreen from "client/components/common/views/loadingScreen";
import WikiRecipeTitle from "../modules/wikiRecipeTitle.module";

interface IwikiCardInfoBuildingView {
  id: string;
  containerRef?: React.RefObject<any>;
  tabAnchorRef?: React.RefObject<any>;
}

const WikiCardInfoBuildingView = React.memo(
  ({ id }: IwikiCardInfoBuildingView) => {
    const { db } = useAtsDexieContext();
    const [building, setBuilding] = useState<any>({});
    const [fetchLoding, setFetchLoading] = useState(true);

    const [nodeIds, setNodeIds] = useState([]);
    const [allRecipes, setRecipes] = useState([]);

    const fetchIndex = async () => {
      // 자원 상세정보
      const resourceFetchResult = await db["building"]
        .where("id")
        .equals(id)
        .first();
      setBuilding(resourceFetchResult);

      // 캠프인경우!!!!!!!
      // 노드 id정보
      if (resourceFetchResult?.buildingType === "camp") {
        const nodeFetchResult = await db["node_index"]
          .where("camp")
          .equals(id)
          .toArray();
        setNodeIds(nodeFetchResult?.map((node) => node.id));
      } else {
        if (!!resourceFetchResult?.logic?.recipe) {
          setRecipes(
            resourceFetchResult?.logic?.recipe
              ?.map((recipe) => {
                return {
                  ...recipe,
                  buildingType: resourceFetchResult?.buildingType,
                };
              })
              .sort((a, b) => Number(b.grade) - Number(a.grade)),
          );
        }
      }
      setFetchLoading(false);
    };

    const recipeType = useMemo(() => {
      if (!building) return "farming";

      return building?.buildingType === "camp"
        ? "gathering"
        : building?.buildingType === "farming"
          ? "farming"
          : building?.buildingType === "service"
            ? "service"
            : "manufacturing";
    }, [building]);

    const uid = uuid();

    useEffect(() => {
      fetchIndex();
    }, []);

    if (fetchLoding) return <LoadingScreen type={"simple"} />;

    return (
      <Box pb={4}>
        {/* 간략정보 */}
        <WikiCardInfoBuildingDetailView
          id={building?.id}
          buildingType={building?.buildingType}
          buildingSize={building?.buildingSize}
          buildTime={building?.buildTime}
          buildingIngredients={building?.buildingIngredients}
          cityScore={building?.cityScore}
          comfort={building?.comfort}
          storage={building?.storage}
          workers={building?.workers}
          proficiency={building?.proficiency}
          allProducts={building?.allProducts}
          rainpunk={building?.rainpunk}
          moveable={building?.moveable}
        />

        {/* 이아래론 레시피 */}
        {/* 야영지의 경우 */}
        {nodeIds?.length > 0 && (
          <>
            <WikiRecipeTitle recipeType={recipeType} />
            <WikiNodeInfoModule key={uid} nodeIds={nodeIds} primary={id} />
          </>
        )}
        {/* 일반적인 제조레시피 */}
        {allRecipes?.length > 0 && (
          <>
            <WikiRecipeTitle recipeType={recipeType} />
            {allRecipes?.map((recipe, idx) => {
              return (
                <WikiRecipeModule
                  key={
                    uid + "buildingsRecipe" + idx + recipe?.grade + building?.id
                  }
                  recipeType={recipeType}
                  grade={recipe?.grade}
                  buildingIds={[building?.id]}
                  time={recipe?.time}
                  product={recipe?.product}
                  productNum={recipe?.productNum}
                  recipeIngredients={recipe?.recipeIngredients}
                />
              );
            })}
          </>
        )}
      </Box>
    );
  },
);

export default WikiCardInfoBuildingView;
