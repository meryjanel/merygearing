import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CompostIcon from "@mui/icons-material/Compost";
import FactoryIcon from "@mui/icons-material/Factory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VolcanoIcon from "@mui/icons-material/Volcano";

interface iwikiRecipeTitle {
  recipeType: string;
}

// 추후에 돌려쓸거같아서 레시피 간략 제목 모듈화
const WikiRecipeTitle = React.memo(({ recipeType }: iwikiRecipeTitle) => {
  // 커먼!!!
  const { t } = useTranslation("common");

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      my={2}
    >
      {recipeType === "gathering" && <VolcanoIcon color={"primary"} />}
      {recipeType === "process" && <FactoryIcon color={"primary"} />}
      {recipeType === "farming" && <CompostIcon color={"primary"} />}
      {recipeType === "manufacturing" && (
        <SettingsSuggestIcon color={"primary"} />
      )}
      {recipeType === "service" && <ManageAccountsIcon color={"primary"} />}
      <Typography
        ml={1}
        textAlign={"center"}
        variant={"h5"}
        color={"primary"}
        fontWeight={700}
      >
        {t(recipeType)}
      </Typography>
    </Box>
  );
});

export default WikiRecipeTitle;
