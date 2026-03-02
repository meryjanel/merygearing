import LoadingScreen from "client/components/common/views/loadingScreen";
import { useMemo, useState } from "react";
import {
  buildingType,
  WikiListBuildingChipButton,
  WikiListBuildingFactor,
} from "../modules/wikiListBuilding.module";
import { Box, Chip, Paper } from "@mui/material";
import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import { useTranslation } from "next-i18next";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const WikiListBuildingView = () => {
  const { db } = useAtsDexieContext();
  const [buildings, setBuildings] = useState([]);
  const [fetchLoding, setFetchLoading] = useState(false);
  const { t, i18n } = useTranslation(["name", "common"]);

  const fetchBuildingIndex = async (buildingType: string) => {
    setFetchLoading(false);
    // 건물 간략정보
    const buildingFetchResult = await db["building_index"]
      .where("buildingType")
      .equals(buildingType)
      .toArray()
      .then((buildings) =>
        buildings.map(
          (building) => building?.id,
          //   allProducts: building?.allProducts,
        ),
      );

    setBuildings(
      buildingFetchResult.sort((a, b) => {
        const nameA = t(a); // i18next 등으로 번역된 이름 가져오기
        const nameB = t(b);
        return nameA.localeCompare(nameB, i18n.language); // 해당 언어의 정렬 규칙 적용
      }),
    );

    setFetchLoading(false);
  };

  const isBuildings = useMemo(() => buildings.length > 0, [buildings]);

  //  로딩스피너
  if (fetchLoding) return <LoadingScreen type={"simple"} />;

  return (
    <>
      <Paper variant={"outlined"}>
        <Box
          my={2}
          px={2}
          display={"flex"}
          width={"100%"}
          flexWrap={"wrap"}
          gap={1}
        >
          {buildingType.map((type, idx) => (
            <WikiListBuildingChipButton
              key={"callingBuildingCipbutton" + type + idx}
              type={type}
              onClick={() => {
                fetchBuildingIndex(type);
              }}
            />
          ))}
          {
            // 리셋버튼
            isBuildings && (
              <Chip
                label={t("common:delete")}
                icon={<DeleteOutlineOutlinedIcon color={"primary"} />}
                sx={{
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
                onClick={() => {
                  setBuildings([]);
                }}
              />
            )
          }
        </Box>

        {isBuildings && (
          <Paper variant={"outlined"} sx={{ m: 1 }}>
            <Box
              py={1}
              px={1}
              display={"flex"}
              width={"100%"}
              flexWrap={"wrap"}
              gap={1}
            >
              {buildings.map((buildingId, idx) => (
                <WikiListBuildingFactor
                  key={"sortedBuildingTypeslist" + buildingId + idx}
                  id={buildingId}
                />
              ))}
            </Box>
          </Paper>
        )}
      </Paper>
    </>
  );
};

export default WikiListBuildingView;
