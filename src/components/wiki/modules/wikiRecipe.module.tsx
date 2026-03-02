import { Box, Paper, Typography } from "@mui/material";
import { uuid } from "client/lib/uuid";
import { symbolColors } from "client/themes/muiTheme";
import React, { useMemo } from "react";
import { WikiThumbnailOnclick } from "./wikiThumbnail.modul";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WikiRecipeButton from "./wikiRecipeButton.module";
import { formatTime } from "client/lib/time";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useWikiStore from "client/stores/useWikiStore";

import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CompostIcon from "@mui/icons-material/Compost";
import FactoryIcon from "@mui/icons-material/Factory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface IwikiRecipeModule {
  recipeType: "gathering" | "farming" | "manufacturing" | "process" | "service";
  grade: number;
  buildingIds: string[];
  time: number;
  product: string;
  productNum: number;
  recipeIngredients: any[];
  ingredientId?: string; // 가공일때 재료를 우선으로 보여주기 위해 추가
}

const WikiRecipeModule = React.memo(
  ({
    recipeType,
    grade,
    buildingIds,
    time,
    product,
    productNum,
    recipeIngredients,
    ingredientId = null,
  }: IwikiRecipeModule) => {
    const uid = uuid();

    // "farming" | "manufacturing" | "process" 이거면 자원
    const productType = useMemo(
      () => (recipeType === "service" ? "service" : "resource"),
      [recipeType],
    );

    // const inputRef = useRef(null);
    const addCard = useWikiStore((s) => s.addCard);
    const onClickThumbnail = (id: string) => {
      addCard(id);
      // inputRef.current?.querySelector("input").blur();
    };

    return (
      <Paper sx={{ mt: 1, px: 1, borderRadius: 5, mx: 1 }} variant={"outlined"}>
        {/* 헤더 건물들과 등급*/}
        <Box
          display={"flex"}
          px={1}
          py={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            borderBottom: 2,
            borderColor: "divider",
          }}
        >
          {/* 타입과 건물 섬네일들 */}
          <Box display={"flex"} columnGap={2} alignItems={"center"}>
            {recipeType === "manufacturing" && (
              <SettingsSuggestIcon fontSize={"large"} color={"primary"} />
            )}
            {recipeType === "farming" && (
              <CompostIcon fontSize={"large"} color={"primary"} />
            )}
            {recipeType === "process" && (
              <FactoryIcon fontSize={"large"} color={"primary"} />
            )}
            {recipeType === "service" && (
              <ManageAccountsIcon fontSize={"large"} color={"primary"} />
            )}

            {buildingIds?.map((buildingId, idx) => (
              <Box
                key={uid + "wikiRecipt" + buildingId + idx}
                width={"30px"}
                minWidth={"30px"}
                height={"30px"}
                sx={{
                  outline: `4px solid ${symbolColors["building"]}`,
                  borderRadius: 1,
                }}
              >
                <WikiThumbnailOnclick
                  id={buildingId}
                  onClick={() => {
                    onClickThumbnail(buildingId);
                  }}
                />
              </Box>
            ))}
            {/* <WikiThumbnail id={id} /> */}
          </Box>

          {/* 등급 */}
          <RatingStars grade={grade} />
        </Box>
        {/* 중단 조합 레시피 */}
        <Box display={"flex"} px={1} py={2}>
          {/* 걸리는 시간 */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <AccessTimeIcon />
            <Typography variant={"body2"}>{formatTime(time)}</Typography>
          </Box>
          {/* 레시피 */}
          <Box
            flex={1}
            mx={2}
            px={2}
            display={"flex"}
            columnGap={3}
            alignItems={"center"}
            sx={{
              borderLeft: 2,
              borderRight: 2,
              borderColor: "divider",
            }}
          >
            {(recipeType === "manufacturing" ||
              recipeType === "process" ||
              recipeType === "service") &&
              recipeIngredients?.map((recipeIngredient, idx) => {
                return (
                  <WikiRecipeButton
                    key={
                      uid +
                      "wikireciptButton" +
                      recipeIngredient?.length +
                      idx +
                      ingredientId
                    }
                    ingredients={recipeIngredient}
                    resource={ingredientId}
                  />
                );
              })}
          </Box>
          {/* 결과물 */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              width={"30px"}
              minWidth={"30px"}
              height={"30px"}
              sx={{
                outline: `4px solid ${symbolColors[productType]}`,
                borderRadius: 1,
              }}
            >
              <WikiThumbnailOnclick
                id={product}
                tooltipDirection={"right"}
                onClick={() => {
                  onClickThumbnail(product);
                }}
              />
            </Box>
            <Typography
              mt={1}
              fontWeight={700}
              variant={"body2"}
              color={"primary"}
            >
              {productNum}
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  },
);

export default WikiRecipeModule;

const RatingStars = ({ grade, maxGrade = 3 }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: maxGrade }).map((_, index) =>
        index < grade ? (
          <StarIcon key={index} fontSize="small" color={"primary"} />
        ) : (
          <StarBorderIcon key={index} fontSize="small" color={"primary"} />
        ),
      )}
    </Box>
  );
};
