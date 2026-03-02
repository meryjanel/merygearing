import { Box, Button, Container, Input, Typography } from "@mui/material";

import { ReactElement, useEffect } from "react";

import Layout from "client/layouts";
import { useAtsDexieContext } from "client/contexts/atsDexieContext";
import { useWikiCardStackContext } from "client/components/wiki/contexts/wikiCardStackContext";
import useWikiStore from "client/stores/useWikiStore";
import { useRouter } from "next/router";

AtsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="ats">{page}</Layout>;
};

function AtsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ats/wiki");
  }, [router]);

  return <></>;
  // const { db } = useAtsDexieContext();

  // // const { setIsDialogOpen } = useWikiCardStackContext();
  // const setIsDialogOpen = useWikiStore((s) => s.setIsDialogOpen);

  // return (
  //   <Box>
  //     <Button
  //       variant="contained"
  //       onClick={() => {
  //         setIsDialogOpen(true);
  //       }}
  //     >
  //       테스트
  //     </Button>
  //     <Typography>테스트트트트</Typography>
  //   </Box>
  // );
}

export default AtsPage;
export { getServerSideProps } from "client/lib/getServerSideProps";
