import { Box, useTheme } from "@mui/material";
import { atsPrifix } from "client/type/ats.type";
import React, { useRef } from "react";
import WikiCardInfoResourceView from "./wikiCardInfoResourceView";
import { nonScroll } from "client/themes/nonScroll";
import WikiCardInfoBuildingView from "./wikiCardInfoBuildingView";

interface IwikiCardView {
  id: string;
}

const WikiCardView = React.memo(({ id }: IwikiCardView) => {
  const theme = useTheme();
  const prefix = id.split("_")[0];
  const decode = atsPrifix[prefix];

  const containerRef = useRef(null);
  const tabAnchorRef = useRef(null);

  return (
    <Box
      ref={containerRef}
      width={"100%"}
      height={"100%"}
      position={"relative"}
      bgcolor={
        !(theme.palette.mode === "dark")
          ? theme.palette.background.paper
          : "rgba(30, 30, 30)"
      }
      sx={{
        overflowY: "auto",
        ...nonScroll,
      }}
    >
      {decode === "resource" && (
        <WikiCardInfoResourceView
          id={id}
          containerRef={containerRef}
          tabAnchorRef={tabAnchorRef}
        />
      )}
      {decode === "building" && <WikiCardInfoBuildingView id={id} />}
    </Box>
  );
});

export default WikiCardView;
