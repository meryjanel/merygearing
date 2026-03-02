import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import { uuid } from "client/lib/uuid";
import React, { useEffect, useMemo, useState } from "react";
import WikiRecipeModule from "../modules/wikiRecipe.module";
import { Box, Typography } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CompostIcon from "@mui/icons-material/Compost";
import { useTranslation } from "react-i18next";
import LoadingScreen from "client/components/common/views/loadingScreen";
import WikiRecipeTitle from "../modules/wikiRecipeTitle.module";

interface IwikiRecipeListView {
  resource: string;
  buildingIds: string[];
}
// 제조소
const WikiResorceRecipeListView = React.memo(
  ({ resource, buildingIds }: IwikiRecipeListView) => {
    const { db } = useAtsDexieContext();
    const { t } = useTranslation(["name", "common"]);

    const [buildings, setBuildings] = useState([]);
    const [fetchLoding, setFetchLoading] = useState(true);

    const fetchIndex = async () => {
      // 건물 정보
      const buildingFetchResult = await db["building"].bulkGet(buildingIds);
      setBuildings(
        buildingFetchResult?.map((building) => ({
          id: building?.id,
          buildingType: building?.buildingType,
          // comfort: building?.comfort,
          // proficiency: building?.proficiency,
          logic: building?.logic,
        })),
      );
      setFetchLoading(false);
    };

    // 채집은 드랍
    // 농사 레시피와, 제조 레시피 분리
    const addRecipe = (recipes, recipe, buildingId) => {
      if (!recipes?.[recipe?.grade]) {
        recipes[recipe?.grade] = {
          buildingIds: [buildingId],
          time: recipe?.time,
          product: recipe?.product,
          productNum: recipe?.productNum,
          recipeIngredients: recipe?.recipeIngredients,
        };
      } else {
        recipes[recipe?.grade]?.buildingIds?.push(buildingId);
      }
    };
    const sortRecipes = useMemo(() => {
      let farmingRecipeArray = [];
      let recipesArray = [];
      if (buildings.length === 0) return { farmingRecipeArray, recipesArray };

      const farmingRecipes = {};
      const recipes = {};
      for (const building of buildings) {
        // 채집 드랍
        if (building.buildingType === "camp") continue;
        else {
          // 농사
          const recipe = building?.logic?.recipe?.find(
            (recipe) => recipe?.product === resource,
          );
          if (building?.buildingType === "farming")
            addRecipe(farmingRecipes, recipe, building.id);
          else addRecipe(recipes, recipe, building.id);
        }
      }

      // 등급별로 모인 객체를 배열형으로 풀어주면서 고등급이 위로오게 정렬
      farmingRecipeArray = Object.keys(farmingRecipes)
        .map((key) => ({
          grade: Number(key),
          ...farmingRecipes[key],
        }))
        .sort((a, b) => Number(b.grade) - Number(a.grade));
      recipesArray = Object.keys(recipes)
        .map((key) => ({
          grade: Number(key),
          ...recipes[key],
        }))
        .sort((a, b) => Number(b.grade) - Number(a.grade));

      return { farmingRecipeArray, recipesArray };
    }, [buildings]);

    useEffect(() => {
      fetchIndex();
    }, []);

    const uid = uuid();

    if (fetchLoding) return <LoadingScreen type={"simple"} />;

    return (
      <Box pb={3}>
        {
          // 농사레시피
          sortRecipes?.farmingRecipeArray?.length > 0 && (
            <>
              <WikiRecipeTitle recipeType={"farming"} />
              {sortRecipes?.farmingRecipeArray?.map((recipe, idx) => (
                <WikiRecipeModule
                  key={uid + "farmingRecipe" + idx + recipe?.grade}
                  recipeType={"farming"}
                  grade={recipe?.grade}
                  buildingIds={recipe?.buildingIds}
                  time={recipe?.time}
                  product={recipe?.product}
                  productNum={recipe?.productNum}
                  recipeIngredients={recipe?.recipeIngredients}
                />
              ))}
            </>
          )
        }
        {
          // 일반레시피
          sortRecipes?.recipesArray?.length > 0 && (
            <>
              <WikiRecipeTitle recipeType={"manufacturing"} />
              {sortRecipes?.recipesArray?.map((recipe, idx) => (
                <WikiRecipeModule
                  key={uid + "manufacturingRecipe" + idx + recipe?.grade}
                  recipeType={"manufacturing"}
                  grade={recipe?.grade}
                  buildingIds={recipe?.buildingIds}
                  time={recipe?.time}
                  product={recipe?.product}
                  productNum={recipe?.productNum}
                  recipeIngredients={recipe?.recipeIngredients}
                />
              ))}
            </>
          )
        }
      </Box>
    );
  },
);

export default WikiResorceRecipeListView;
