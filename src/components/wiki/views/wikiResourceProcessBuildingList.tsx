import { Box, Typography } from "@mui/material";
import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import { uuid } from "client/lib/uuid";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WikiRecipeModule from "../modules/wikiRecipe.module";
import LoadingScreen from "client/components/common/views/loadingScreen";
import WikiRecipeTitle from "../modules/wikiRecipeTitle.module";

interface IwikiResourceProcessBuildingList {
  resource: string;
  buildingIds: string[];
}

// 가공소
const WikiResourceProcessBuildingList = React.memo(
  ({ resource, buildingIds }: IwikiResourceProcessBuildingList) => {
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

    // 가공건물
    // 등급위주
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
    // 가공품 넣기
    const addRecipeKey = (outerRecipes, recipe, buildingId) => {
      if (!outerRecipes?.[recipe?.product]) outerRecipes[recipe?.product] = {};
      addRecipe(outerRecipes[recipe?.product], recipe, buildingId);
    };
    const sortRecipes = useMemo(() => {
      let recipesArray = [];
      let processRecipes = [];
      let serviceRecipes = [];

      if (buildings.length === 0) return { processRecipes, serviceRecipes };

      //  가공품을 key로 갖는 레시피 모음 내부는 등급을 key로 가짐
      const outerRecipes = {};

      for (const building of buildings) {
        // 이건 항상 재료로써의 가공품
        const recipeArray = building?.logic?.recipe;
        // 자원을 재료로 쓰는 레시피 찾기
        for (const recipe of recipeArray) {
          const allRecipeIngredients = [];
          recipe?.recipeIngredients.forEach((ingredient) => {
            ingredient.forEach((ing) => {
              allRecipeIngredients.push(ing?.resource);
            });
          });
          if (allRecipeIngredients.includes(resource)) {
            addRecipeKey(outerRecipes, recipe, building?.id);
          }
        }
        // 건물이 이 자원을 재료로쓰는 레시피 추려내기
      }

      //   우선 가공품별로 해체하고,
      // 등급별로 모인 객체를 배열형으로 풀어주면서 고등급이 위로오게 정렬
      recipesArray = Object.keys(outerRecipes)
        .map((productkey) => ({
          ...outerRecipes[productkey],
        })) //여기까지 가공품별 해체
        .map((recipes) =>
          Object.keys(recipes)
            .map((key) => ({
              grade: Number(key),
              ...recipes[key],
            }))
            .sort((a, b) => Number(b.grade) - Number(a.grade)),
        )
        .flat();

      // 가공 레시피
      processRecipes = recipesArray.filter((recipe) =>
        recipe?.product?.includes("res_"),
      );
      // 서비스 레시피
      serviceRecipes = recipesArray.filter((recipe) =>
        recipe?.product?.includes("sev_"),
      );

      return { processRecipes, serviceRecipes };
    }, [buildings]);

    useEffect(() => {
      fetchIndex();
    }, []);

    const uid = uuid();

    if (fetchLoding) return <LoadingScreen type={"simple"} />;

    return (
      <Box pb={3}>
        {
          // 가공레시피
          sortRecipes?.processRecipes?.length > 0 && (
            <>
              <WikiRecipeTitle recipeType={"process"} />
              {sortRecipes?.processRecipes?.map((recipe, idx) => (
                <WikiRecipeModule
                  key={
                    uid +
                    "processRecipe" +
                    idx +
                    recipe?.grade +
                    recipe?.product
                  }
                  recipeType={"process"}
                  grade={recipe?.grade}
                  buildingIds={recipe?.buildingIds}
                  time={recipe?.time}
                  product={recipe?.product}
                  productNum={recipe?.productNum}
                  recipeIngredients={recipe?.recipeIngredients}
                  ingredientId={resource}
                />
              ))}
            </>
          )
        }
        {
          // 용역레시피
          sortRecipes?.serviceRecipes?.length > 0 && (
            <>
              <WikiRecipeTitle recipeType={"service"} />

              {sortRecipes?.serviceRecipes?.map((recipe, idx) => (
                <WikiRecipeModule
                  key={
                    uid +
                    "serviceRecipe" +
                    idx +
                    recipe?.grade +
                    recipe?.product
                  }
                  recipeType={"service"}
                  grade={recipe?.grade}
                  buildingIds={recipe?.buildingIds}
                  time={recipe?.time}
                  product={recipe?.product}
                  productNum={recipe?.productNum}
                  recipeIngredients={recipe?.recipeIngredients}
                  ingredientId={resource}
                />
              ))}
            </>
          )
        }
      </Box>
    );
  },
);

export default WikiResourceProcessBuildingList;
