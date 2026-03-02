import { alpha, Box, Chip, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WikiThumbnail } from "./wikiThumbnail.modul";
import useWikiStore from "client/stores/useWikiStore";
import { symbolColors } from "client/themes/muiTheme";

import EggIcon from "@mui/icons-material/Egg";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
// import VolcanoIcon from "@mui/icons-material/Volcano";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TollIcon from "@mui/icons-material/Toll";
import HandymanIcon from "@mui/icons-material/Handyman";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

export const resourceTypes = [
  "raw_food",
  "complex_food",
  "crafting_material",
  "refined_crafting_material",
  "building_material",
  "clothing_good",
  "service_good",
  "fuel",
  "exploration",
  "trade_good",
];

interface IwikiListResource {
  type: string;
  resourceIds: string[];
}

const WikiListResource = React.memo(
  ({ type, resourceIds }: IwikiListResource) => {
    const { t, i18n } = useTranslation("name");

    const sorted = useMemo(() => {
      return resourceIds.sort((a, b) => {
        const nameA = t(a); // i18next 등으로 번역된 이름 가져오기
        const nameB = t(b);
        return nameA.localeCompare(nameB, i18n.language); // 해당 언어의 정렬 규칙 적용
      });
    }, [resourceIds]);

    return (
      <Box position={"relative"} mb={3}>
        <WikiListResourceTitle resourceType={type} />
        <Paper variant={"outlined"}>
          <Box
            my={2}
            px={2}
            display={"flex"}
            width={"100%"}
            flexWrap={"wrap"}
            gap={1}
          >
            {sorted.map((resource, idx) => (
              <WikiListResourceFactor
                key={"sortedResourceAlllist" + resource + idx}
                id={resource}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    );
  },
);

export default WikiListResource;

// 아이템별 칩버튼
interface IwikiListResourceFactor {
  id: string;
}
const WikiListResourceFactor = React.memo(({ id }: IwikiListResourceFactor) => {
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
          border={`2px solid ${symbolColors["resource"]}`}
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
});

interface IwikiListResourceTitle {
  resourceType: string;
}

const WikiListResourceTitle = React.memo(
  ({ resourceType }: IwikiListResourceTitle) => {
    // 커먼!!!
    const { t } = useTranslation("common");

    return (
      <Box
        py={1}
        px={3}
        borderBottom={2}
        borderColor={"divider"}
        borderRadius={8}
        display={"flex"}
        alignItems={"center"}
        // justifyContent={"center"}
        my={2}
        position={"sticky"}
        top={"50px"}
        bgcolor={(theme) => theme.palette.background.paper}
        zIndex={2}
      >
        {resourceType === "raw_food" && <EggIcon color={"primary"} />}
        {resourceType === "complex_food" && (
          <KebabDiningIcon color={"primary"} />
        )}
        {resourceType === "crafting_material" && (
          <BubbleChartIcon color={"primary"} />
        )}
        {resourceType === "refined_crafting_material" && (
          <HandymanIcon color={"primary"} />
        )}
        {resourceType === "building_material" && (
          <CarpenterIcon color={"primary"} />
        )}
        {resourceType === "clothing_good" && (
          <CheckroomIcon color={"primary"} />
        )}
        {resourceType === "service_good" && <LiquorIcon color={"primary"} />}
        {resourceType === "fuel" && (
          <LocalFireDepartmentIcon color={"primary"} />
        )}
        {resourceType === "exploration" && (
          <TravelExploreIcon color={"primary"} />
        )}
        {resourceType === "trade_good" && <TollIcon color={"primary"} />}

        <Typography
          ml={1}
          textAlign={"center"}
          variant={"h5"}
          color={"primary"}
          fontWeight={700}
        >
          {t(resourceType)}
        </Typography>
      </Box>
    );
  },
);
