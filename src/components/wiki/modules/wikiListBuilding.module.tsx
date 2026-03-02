import { Box, Chip } from "@mui/material";
import useWikiStore from "client/stores/useWikiStore";
import React from "react";
import { useTranslation } from "react-i18next";
import VolcanoIcon from "@mui/icons-material/Volcano";
import CompostIcon from "@mui/icons-material/Compost";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { symbolColors } from "client/themes/muiTheme";
import { WikiThumbnail } from "./wikiThumbnail.modul";

export const buildingType = [
  "camp",
  "farming",
  "food",
  "industry",
  "service",
  "city",
];

// 건물 종류별 칩버튼
interface IwikiListBuildingChipButton {
  type: string;
  onClick?: () => void;
}
export const WikiListBuildingChipButton = React.memo(
  ({ type, onClick }: IwikiListBuildingChipButton) => {
    const { t } = useTranslation("common");

    return (
      <Chip
        label={`${t(type)} ${t("building")}`}
        icon={
          type === "camp" ? (
            <VolcanoIcon color={"primary"} />
          ) : type === "farming" ? (
            <CompostIcon color={"primary"} />
          ) : type === "food" ? (
            <LocalDiningIcon color={"primary"} />
          ) : type === "industry" ? (
            <PrecisionManufacturingIcon color={"primary"} />
          ) : type === "service" ? (
            <ManageAccountsIcon color={"primary"} />
          ) : type === "city" ? (
            <LocationCityIcon color={"primary"} />
          ) : (
            <></>
          )
        }
        sx={{
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-6px)",
          },
        }}
        onClick={onClick}
      />
    );
  },
);

// 건물 Id별 칩버튼
interface IwikiListBuildingFactor {
  id: string;
}
export const WikiListBuildingFactor = React.memo(
  ({ id }: IwikiListBuildingFactor) => {
    const { t } = useTranslation("name");
    const addCard = useWikiStore((s) => s.addCard);

    return (
      <Chip
        label={t(id)}
        icon={
          <Box
            borderRadius={2}
            overflow={"hidden"}
            width={"25px"}
            height={"25px"}
            border={`2px solid ${symbolColors["building"]}`}
          >
            <WikiThumbnail id={id} />
          </Box>
        }
        sx={{
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-6px)",
          },
        }}
        onClick={() => {
          addCard(id);
        }}
      />
    );
  },
);
