import { Box, Paper, Typography } from "@mui/material";
import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import { iconSrc } from "client/lib/imgSrc";
import { uuid } from "client/lib/uuid";
import React, { useEffect, useMemo, useState } from "react";
import FoundationIcon from "@mui/icons-material/Foundation";
import { WikiThumbnail, WikiThumbnailOnclick } from "./wikiThumbnail.modul";
import useWikiStore from "client/stores/useWikiStore";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { symbolColors } from "client/themes/muiTheme";
import LoadingScreen from "client/components/common/views/loadingScreen";

interface IwikiNodeInfoListModule {
  nodeIds: string[];
  primary?: string;
}

const WikiNodeInfoListModule = React.memo(
  ({ nodeIds, primary }: IwikiNodeInfoListModule) => {
    const { db } = useAtsDexieContext();

    const [nodes, setNodes] = useState([]);
    const [fetchLoding, setFetchLoading] = useState(true);
    const fetchIndex = async () => {
      // 노드 정보
      const nodeFetchResult = await db["node"].bulkGet(nodeIds);
      setNodes(
        nodeFetchResult?.map((node) => ({
          id: node?.id,
          building:
            node?.size === "small"
              ? node?.camp?.find((camp) => camp.includes("small")) ||
                node?.camp[0]
              : node?.camp[0],
          charges: node?.charges,
          primary: node?.primary,
          bonus: node?.bonus,
          biome: node?.biome,
          special: node?.special,
        })),
      );
      setFetchLoading(false);
    };

    const sortNodes = useMemo(() => {
      if (!primary) return nodes;
      else {
        const primaryNodes = nodes.filter((node) => node.primary === primary);
        const nonPrimaryNodes = nodes.filter(
          (node) => node.primary !== primary,
        );
        return [...primaryNodes, ...nonPrimaryNodes];
      }
    }, [primary, nodes]);

    useEffect(() => {
      fetchIndex();
    }, []);

    const uid = uuid();
    if (fetchLoding) return <LoadingScreen type={"simple"} />;

    return (
      <>
        {sortNodes?.length > 0 &&
          sortNodes.map((node, idx) => (
            <WikiNodeInfoModule
              key={uid + node.id + idx}
              id={node.id}
              building={node.building}
              charges={node.charges}
              primary={node.primary}
              bonus={node.bonus}
              biome={node.biome}
              special={node?.special}
            />
          ))}
      </>
    );
  },
);

export default WikiNodeInfoListModule;

interface IwikiNodeInfoModule {
  id: string;
  building: string;
  charges: number;
  primary: string;
  bonus: any;
  biome: string[];
  special?: Object;
}

const WikiNodeInfoModule = React.memo(
  ({
    id,
    building,
    charges,
    primary,
    bonus,
    biome,
    special,
  }: IwikiNodeInfoModule) => {
    // const inputRef = useRef(null);
    const addCard = useWikiStore((s) => s.addCard);
    const onClickThumbnail = (id: string) => {
      addCard(id);
      // inputRef.current?.querySelector("input").blur();
    };

    const { t } = useTranslation(["name", "common"]);

    const uid = uuid();

    return (
      <Paper sx={{ mt: 1, px: 1, borderRadius: 5, mx: 2 }} variant={"outlined"}>
        {/* 헤더 노드 섬네일, 빌딩, 이름, 자원량 */}
        <Box
          display={"flex"}
          px={1}
          py={2}
          // bgcolor={"yellowGreen"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            borderBottom: 2,
            borderColor: "divider",
          }}
        >
          <Box
            width={"30px"}
            minWidth={"30px"}
            height={"30px"}
            sx={{
              outline: `4px solid ${symbolColors["node"]}`,
              borderRadius: 1,
            }}
          >
            <WikiThumbnail id={id} />
          </Box>

          <Box
            width={"25px"}
            minWidth={"25px"}
            height={"25px"}
            ml={2}
            sx={{
              outline: `3px solid ${symbolColors["building"]}`,
              borderRadius: 1,
            }}
          >
            <WikiThumbnailOnclick
              id={building}
              onClick={() => {
                onClickThumbnail(building);
              }}
            />
          </Box>
          <Typography
            variant={"subtitle2"}
            fontWeight={800}
            color={"primary"}
            ml={1}
            flex={1}
            sx={{
              wordBreak: "keep-all",
            }}
          >
            {t(id)}
          </Typography>

          <Box ml={1}>
            <Typography variant={"body2"} fontSize={"0.8rem"}>
              {t("common:charges")}
            </Typography>
            <Typography
              variant={"body1"}
              fontSize={"0.8rem"}
              textAlign={"center"}
              fontWeight={700}
            >
              {charges}
            </Typography>
          </Box>
        </Box>
        {/* 자원, primary, 보너스 */}
        <Box
          display={"flex"}
          px={1}
          py={2}
          alignItems={"center"}
          sx={{
            borderBottom: 2,
            borderColor: "divider",
          }}
        >
          {/* primary */}
          <Box
            width={"30px"}
            minWidth={"30px"}
            height={"30x"}
            sx={{
              outline: `3px solid ${symbolColors["resource"]}`,
              borderRadius: 1,
            }}
          >
            <WikiThumbnailOnclick
              id={primary}
              onClick={() => {
                onClickThumbnail(primary);
              }}
            />
          </Box>
          {/* 보너스 */}
          <AddIcon fontSize={"small"} sx={{ ml: 1 }} />
          {bonus?.map((bonusResource, idx) => (
            <Box
              mr={1}
              width={"36px"}
              // bgcolor={"skyblue"}
              key={"bonusResource" + idx + bonusResource?.id + uid}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              // bgcolor={"skyblue"}
            >
              <Box
                width={"24px"}
                minWidth={"24px"}
                height={"24px"}
                sx={{
                  outline: `3px solid ${symbolColors["resource"]}`,
                  borderRadius: 1,
                }}
              >
                <WikiThumbnailOnclick
                  id={bonusResource?.id}
                  onClick={() => {
                    onClickThumbnail(bonusResource?.id);
                  }}
                />
              </Box>
              <Typography
                mt={"3px"}
                variant={"body2"}
                fontSize={"0.85rem"}
              >{`${bonusResource?.bonusPercent}%`}</Typography>
            </Box>
          ))}
          {
            // 배수
            !!special && !!special["multiplier"] && (
              <Box flex={1}>
                <Typography
                  variant="subtitle1"
                  textAlign={"right"}
                  color={"primary"}
                >
                  {`x${special["multiplier"]}`}
                </Typography>
              </Box>
            )
          }
        </Box>
        {/* 생물군계 */}
        <Box
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          py={1}
        >
          <Box display={"flex"} columnGap={1}>
            {biome?.length > 0 &&
              biome.map((biomeId) => (
                <Box
                  key={id + biomeId + "nodebiome" + uid}
                  width={"30px"}
                  height={"30px"}
                >
                  <WikiThumbnailOnclick
                    id={biomeId}
                    backgroundColor={"transparent"}
                    tooltipDirection={"right"}
                    disable={true}
                    onClick={() => {}}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Paper>
    );
  },
);
