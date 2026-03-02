import { Box, Grid, Paper, Typography } from "@mui/material";
import { iconSrc, sourceSrc } from "client/lib/imgSrc";
import { uuid } from "client/lib/uuid";
import { symbolColors } from "client/themes/muiTheme";
import { specialize } from "client/type/ats.type";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  WikiThumbnail,
  WikiThumbnailOnclick,
} from "../modules/wikiThumbnail.modul";
import useWikiStore from "client/stores/useWikiStore";
import { gradeStar } from "client/lib/gradeStar";
import { formatTime } from "client/lib/time";
import OilBarrelOutlinedIcon from "@mui/icons-material/OilBarrelOutlined";

interface IwikiCardInfoBuildingDetailView {
  id: string;
  buildingType: string;
  buildingSize: string;
  buildTime: number;
  buildingIngredients: any[];
  cityScore: number;
  comfort: string[];
  storage: number;
  workers: number;
  proficiency: string[];
  allProducts: string[];
  rainpunk: string;
  moveable: boolean;
}

const WikiCardInfoBuildingDetailView = React.memo(
  ({
    id,
    buildingType,
    buildingSize,
    buildTime,
    buildingIngredients,
    cityScore,
    comfort,
    storage,
    workers,
    proficiency,
    allProducts,
    rainpunk,
    moveable,
  }: IwikiCardInfoBuildingDetailView) => {
    const { t } = useTranslation(["name", "common"]);

    const addCard = useWikiStore((s) => s.addCard);

    const uid = uuid();

    // 분해용으로 만들어둔 등급분리
    const simpleRecipes = useMemo(() => {
      const result = [];
      if (!allProducts || allProducts?.length === 0) return result;

      allProducts.forEach((product) => {
        if (product.includes(":")) {
          const splited = product.split(":");
          result.push({
            resourceId: splited[0],
            grade: Number(splited[1]),
          });
        }
      });

      return result.sort((a, b) => Number(b.grade) - Number(a.grade));
    }, [allProducts]);

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
            {`${t(`common:${buildingType}`)} ${t("common:building")}`}
          </Typography>

          {/* 이미지 */}
          <Box
            maxWidth={"60%"}
            sx={{ aspectRatio: "1/1" }}
            border={`4px solid ${symbolColors["building"]}`}
            mx={"auto"}
          >
            <img
              src={sourceSrc(id)}
              draggable={false}
              style={{ width: "100%" }}
            />
          </Box>

          {/* 빗물공학 */}
          {!!rainpunk && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={1}
              color={
                rainpunk === "res_drizzle_water"
                  ? "#03691e"
                  : rainpunk === "res_clearance_water"
                    ? "#Fa7c05"
                    : rainpunk === "res_storm_water"
                      ? "#15328c"
                      : "auto"
              }
            >
              <OilBarrelOutlinedIcon fontSize={"large"} />
              <Typography
                component={"div"}
                variant={"body1"}
                noWrap={true}
                ml={1}
                py={0.5}
                sx={
                  {
                    // cursor: !disabled ? "pointer" : "auto",
                    // "&:hover": {
                    //   color: !disabled ? "primary.main" : "auto",
                    //   textDecoration: !disabled ? "underline" : "auto",
                    // },
                  }
                }
                // onClick={() => {
                //   if (!disabled) addCard(ings?.material);
                // }}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                fontWeight={500}
              >
                <Box
                  width={"30px"}
                  height={"30px"}
                  border={`3px solid ${symbolColors["resource"]}`}
                  mr={1}
                  borderRadius={"50%"}
                >
                  <WikiThumbnail borderRadius={"50%"} id={rainpunk} />
                </Box>
                {`${t(rainpunk)}`}
              </Typography>
            </Box>
          )}

          {/* 일꾼 */}
          {!!workers && (
            <Box my={1} display={"flex"} justifyContent={"center"}>
              <Paper
                variant={"outlined"}
                sx={{
                  width: "fit-content",
                  py: 1,
                  px: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: 1,
                }}
              >
                {Array(workers)
                  .fill(null)
                  .map((_, idx) => (
                    <Box
                      key={uid + idx + "workerAvatar_in_detail"}
                      width={{ xs: "35px", sm: "40px" }}
                    >
                      <img
                        src={"/img/icon/etc/worker_avatar.webp"}
                        draggable={false}
                        style={{
                          backgroundColor: "transparent",
                          border: `2px solid ${symbolColors["building"]}`,
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  ))}
              </Paper>
            </Box>
          )}
          {/* 전문화 */}
          {!!proficiency && proficiency?.length > 0 && (
            <>
              {/* <Typography textAlign={"center"} variant={"h5"} fontWeight={700}>
                {t("common:proficiency")}
              </Typography> */}
              {proficiency?.map((profit, idx) => (
                <Specialization key={uid + "proficiency" + idx} id={profit} />
              ))}
            </>
          )}
          {/* 편안 */}
          {!!comfort && comfort?.length > 0 && (
            <>
              {/* <Typography textAlign={"center"} variant={"h5"} fontWeight={700}>
                {t("common:comfort")}
              </Typography> */}
              {comfort?.map((comfort, idx) => (
                <Specialization key={uid + "comfort" + idx} id={comfort} />
              ))}
            </>
          )}

          {/* 간이 레시피 */}
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

            <Box mt={1} mx={"auto"}>
              {simpleRecipes?.map((simpleRecipe, idx) => {
                // ** 서비스는 설명 없음
                const disabled = simpleRecipe?.resourceId?.includes("sev_");

                return (
                  <Typography
                    component={"div"}
                    key={`${uid}${simpleRecipe?.resourceId}${idx}buildingssimplerecipe`}
                    variant={"body1"}
                    noWrap={true}
                    py={0.5}
                    ml={1}
                    sx={{
                      cursor: !disabled ? "pointer" : "auto",
                      "&:hover": {
                        color: !disabled ? "primary.main" : "auto",
                        textDecoration: !disabled ? "underline" : "auto",
                      },
                    }}
                    onClick={() => {
                      if (!disabled) addCard(simpleRecipe?.resourceId);
                    }}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Box
                      width={"30px"}
                      height={"30px"}
                      border={`3px solid ${symbolColors[simpleRecipe?.resourceId?.includes("sev_") ? "service" : "resource"]}`}
                      mr={1}
                    >
                      <WikiThumbnail id={simpleRecipe?.resourceId} />
                    </Box>
                    {`(${gradeStar(simpleRecipe?.grade)}) ${t(simpleRecipe?.resourceId)}`}
                  </Typography>
                );
              })}
            </Box>

            {!!storage && (
              <Typography variant={"subtitle2"} fontWeight={500} ml={1}>
                {`${storage} ${t("common:storage")}`}
              </Typography>
            )}
          </Paper>

          {/* 건물 상세 정보 */}
          <Paper
            variant={"outlined"}
            sx={{
              mx: "auto",
              my: 2,
              pt: 1,
              maxWidth: "300px",
            }}
          >
            <Paper
              variant={"outlined"}
              sx={{
                mx: "auto",
                width: "fit-content",
                minWidth: "50%",
                px: 1,
              }}
            >
              <Typography
                variant={"subtitle1"}
                textAlign={"center"}
                color={"primary"}
                fontWeight={700}
              >
                {t("common:construction")}
              </Typography>
            </Paper>
            <Grid container my={1} px={1} width={"100%"}>
              {/* 건축재료 */}
              {!!buildingIngredients &&
                buildingIngredients.length > 0 &&
                buildingIngredients.map((ings, idx) => {
                  // ** 이슈생길일 있으면 추가
                  const disabled = false;

                  return (
                    <React.Fragment
                      key={uid + idx + "buildingIngredients" + ings?.material}
                    >
                      <Grid size={2} display={"flex"} alignItems={"center"}>
                        <Typography
                          variant="body1"
                          color="primary"
                          fontWeight={500}
                        >
                          {ings?.num}
                        </Typography>
                      </Grid>

                      <Grid size={10} display={"flex"} alignItems={"center"}>
                        <Typography
                          component={"div"}
                          variant={"body1"}
                          noWrap={true}
                          py={0.5}
                          ml={1}
                          sx={{
                            cursor: !disabled ? "pointer" : "auto",
                            "&:hover": {
                              color: !disabled ? "primary.main" : "auto",
                              textDecoration: !disabled ? "underline" : "auto",
                            },
                          }}
                          onClick={() => {
                            if (!disabled) addCard(ings?.material);
                          }}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Box
                            width={"30px"}
                            height={"30px"}
                            border={`3px solid ${symbolColors["resource"]}`}
                            mr={1}
                          >
                            <WikiThumbnail id={ings?.material} />
                          </Box>
                          {`${t(ings?.material)}`}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              {/* 그외정보 */}
              <Grid size={2} display={"flex"} alignItems={"center"}>
                {cityScore}
              </Grid>
              <Grid size={10} display={"flex"} alignItems={"center"}>
                <Typography
                  variant={"body1"}
                  noWrap={true}
                  py={0.5}
                  ml={1}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {`${t("common:city_score")}`}
                </Typography>
              </Grid>

              <Grid size={2} display={"flex"} alignItems={"center"}>
                {formatTime(buildTime)}
              </Grid>
              <Grid size={10} display={"flex"} alignItems={"center"}>
                <Typography
                  variant={"body1"}
                  noWrap={true}
                  py={0.5}
                  ml={1}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {`${t("common:build_time")}`}
                </Typography>
              </Grid>

              <Grid size={2} display={"flex"} alignItems={"center"}>
                {buildingSize.replaceAll(" ", "")}
              </Grid>
              <Grid size={10} display={"flex"} alignItems={"center"}>
                <Typography
                  variant={"body1"}
                  noWrap={true}
                  py={0.5}
                  ml={1}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {`${t("common:building_size")}`}
                </Typography>
              </Grid>
              {/* 이동가능 */}
              <Grid size={12}>
                <Typography
                  variant={"body1"}
                  noWrap={true}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {`${t(moveable ? "common:moveable" : "common:not_moveable")}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Box>
    );
  },
);

export default WikiCardInfoBuildingDetailView;

interface Ispecialization {
  id: string;
}

const Specialization = ({ id }: Ispecialization) => {
  const { t } = useTranslation("name");
  const spcId = `spc_${id}`;
  const specialized = specialize[spcId];

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={1}
    >
      <img
        src={iconSrc(`${spcId}`)}
        draggable={false}
        style={{ backgroundColor: "transparent" }}
      />
      <Typography variant={"h6"} color={"primary"} mx={1}>
        {t(spcId)}
      </Typography>
      <Box
        width={"30px"}
        height={"30px"}
        sx={{
          border: `3px solid ${symbolColors["species"]}`,
        }}
        borderRadius={"50%"}
      >
        <WikiThumbnailOnclick
          id={specialized.spe}
          backgroundColor={"transparent"}
          disable={true}
          onClick={() => {}}
          borderRadius={"50%"}
        />
      </Box>
    </Box>
  );
};
