import { Box, Container, Typography } from "@mui/material";
import Dexie from "dexie";
import { ReactElement, useEffect } from "react";
import Layout from "client/layouts";
import WikiView from "client/components/wiki";
import { useAtsDataSync } from "client/hooks/useAtsDataSync.hook";
import WikiListView from "client/components/wiki/views/wikiListView";

AtsWikiPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="ats">{page}</Layout>;
};

function AtsWikiPage() {
  useEffect(() => {}, []);

  return (
    <Box>
      <WikiListView />
    </Box>
  );
}

export default AtsWikiPage;
export { getServerSideProps } from "client/lib/getServerSideProps";
