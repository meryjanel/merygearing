import { Box, Paper, Typography } from "@mui/material";
import { gradeStar } from "client/lib/gradeStar";
import { sourceSrc } from "client/lib/imgSrc";
import { uuid } from "client/lib/uuid";
import useWikiStore from "client/stores/useWikiStore";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WikiThumbnailOnclick } from "../modules/wikiThumbnail.modul";
import React from "react";
import { symbolColors } from "client/themes/muiTheme";

export interface iwikiCardInfoResourceDetailView {
  id: string;
  type: string;
  speciesPreference: string[];
  productionBuildings: any;
}

const WikiCardInfoResourceDetailView = React.memo(
  ({
    id,
    type,
    speciesPreference,
    productionBuildings,
  }: iwikiCardInfoResourceDetailView) => {
    const { t } = useTranslation(["name", "common"]);

    const addCard = useWikiStore((s) => s.addCard);

    const uid = uuid();

    // 캠프빼고, 등급이 높은순으로 정렬
    const filteringBuildings = useMemo(() => {
      if (!productionBuildings && productionBuildings?.length === 0) return [];
      else {
        return productionBuildings
          .filter((pb) => pb.buildingType !== "camp")
          .sort((a, b) => Number(b.grade) - Number(a.grade));
      }
    }, [productionBuildings]);

    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Paper
          sx={{
            mt: 1,
            px: 1,
            py: 3,
            borderRadius: 2,
            mx: 1,
            width: "100%",
            maxWidth: 400,
          }}
          variant={"outlined"}
        >
          {/* 이름 */}
          <Typography
            variant={"h5"}
            textAlign={"center"}
            fontWeight={800}
            color={"primary"}
          >
            {t(id)}
          </Typography>
          {/* 타입 */}
          <Typography variant={"subtitle1"} textAlign={"center"}>
            {t(`common:${type}`)}
          </Typography>

          {/* 이미지 */}
          <Box
            maxWidth={"60%"}
            sx={{ aspectRatio: "1/1" }}
            border={`4px solid ${symbolColors["resource"]}`}
            mx={"auto"}
          >
            <img
              src={sourceSrc(id)}
              draggable={false}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          {/* 요구 종족 */}
          {!!speciesPreference && speciesPreference?.length > 0 && (
            <Box
              display={"flex"}
              mx={"auto"}
              my={2}
              alignItems={"center"}
              justifyContent={"center"}
              columnGap={1}
            >
              <Typography
                variant="subtitle1"
                fontWeight={500}
              >{`${t("common:preference")} : `}</Typography>
              {speciesPreference.map((specid, idx) => (
                <Box
                  key={id + specid + "speciesPreference" + uid + idx}
                  width={"30px"}
                  height={"30px"}
                  borderRadius={"50%"}
                  sx={{
                    outline: `3px solid ${symbolColors["species"]}`,
                  }}
                >
                  <WikiThumbnailOnclick
                    id={specid}
                    backgroundColor={"transparent"}
                    disable={true}
                    onClick={() => {}}
                    borderRadius={"50%"}
                  />
                </Box>
              ))}
            </Box>
          )}

          {/* 간이 레시피 */}
          {!!filteringBuildings && filteringBuildings?.length > 0 && (
            <Paper
              variant={"outlined"}
              sx={{
                mx: "auto",
                my: 2,
                py: 1,
                maxWidth: "300px",
              }}
            >
              <Paper
                variant={"outlined"}
                sx={{
                  mx: "auto",
                  width: "50%",
                }}
              >
                <Typography
                  variant={"subtitle1"}
                  textAlign={"center"}
                  color={"primary"}
                  fontWeight={700}
                >
                  {t("common:recipes")}
                </Typography>
              </Paper>

              {/* 레시피건물 */}
              <Box mt={1} mx={"auto"}>
                {filteringBuildings?.map((productBuilding, idx) => (
                  <Typography
                    key={`${uid}${productBuilding?.id}${idx}filteredProductionBuildings`}
                    variant={"body1"}
                    noWrap={true}
                    py={0.5}
                    ml={1}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "primary.main",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      addCard(productBuilding?.id);
                    }}
                  >{`(${gradeStar(productBuilding?.grade)}) ${t(productBuilding?.id)}`}</Typography>
                ))}
              </Box>
            </Paper>
          )}
        </Paper>
      </Box>
    );
  },
);

export default WikiCardInfoResourceDetailView;
