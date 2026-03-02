import { Box, Typography } from "@mui/material";
import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import { useEffect, useMemo, useState } from "react";
import WikiListResource, {
  resourceTypes,
} from "../modules/wikiListResource.module";
import LoadingScreen from "client/components/common/views/loadingScreen";
import { useTranslation } from "react-i18next";

const WikiListResourceView = () => {
  const { db } = useAtsDexieContext();

  const [fetchLoding, setFetchLoading] = useState(true);

  const [allResources, setAllResources] = useState([]);

  const { t } = useTranslation("common");

  const fetchIndex = async () => {
    // 자원 간략정보
    // 메모리 터지는거 방지
    const resourceFetchResult = await db["resource_index"]
      .toArray()
      .then((resources) =>
        resources.map((resource) => ({
          id: resource?.id,
          type: resource?.type,
        })),
      );

    setAllResources(resourceFetchResult);

    setFetchLoading(false);
  };

  const addResource = (resources, resource) => {
    if (!resources?.[resource?.type]) {
      resources[resource?.type] = [resource?.id];
    } else {
      resources[resource?.type].push(resource?.id);
    }
  };
  const categorizedResource = useMemo(() => {
    const result = {};
    if (allResources.length === 0) return result;
    allResources.forEach((resource) => {
      addResource(result, resource);
    });
    return result;
  }, [allResources]);

  useEffect(() => {
    fetchIndex();
  }, []);

  //  로딩스피너
  if (fetchLoding) return <LoadingScreen type={"simple"} />;

  return (
    <>
      <Typography
        mt={2}
        py={1}
        variant={"h4"}
        textAlign={"center"}
        fontWeight={700}
        borderTop={1}
        borderColor={"divider"}
      >
        {t("resource")}
      </Typography>
      {!!resourceTypes &&
        resourceTypes.length > 0 &&
        resourceTypes?.map((key, idx) => (
          <WikiListResource
            key={"eachListofallResourceContainter" + key + idx}
            type={key}
            resourceIds={categorizedResource[key]}
          />
        ))}
    </>
  );
};
export default WikiListResourceView;
