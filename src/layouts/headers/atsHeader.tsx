import { Box, Container } from "@mui/material";

// import AvatarSetting from "@/components/user/avatarSetting";
import { useEffect, useMemo } from "react";

import { useThemeContext } from "client/contexts/themeContext";
import ButtonToggleDarkMode from "client/components/common/views/buttonToggleDarkMode";
import ButtonToUp from "client/components/common/views/buttonToUp";
import AtsSearchInput from "./views/atsSearchInput";
import WikiCardStackDialogView from "client/components/wiki/views/wikiCardStackDialogView";
import { useWikiCardStackContext } from "client/components/wiki/contexts/wikiCardStackContext";
import React from "react";
import WikiDialogView from "client/components/wiki/views/wikiDialogView";
import ButtonTogglLanguage from "client/components/common/views/buttonToggleLanguage";

// export const mainHeaderHeight = 60;

// 다크모드 헤더bg prev "#141517" #1e1e1ef2

const AtsHeader = React.memo(() => {
  const { isDarkMode, isXs } = useThemeContext();
  const { isDialogOpen, setIsDialogOpen } = useWikiCardStackContext();

  const mainHeaderHeight = useMemo(() => (isXs ? 52 : 60), [isXs]);

  return (
    <>
      <Box
        zIndex={100}
        position={"fixed"}
        borderBottom={"1px solid rgba(145, 158, 171, 0.24)"}
        top={0}
        left={0}
        right={0}
        //   width={"100%"}
        //   maxWidth={650}
        margin={"0 auto"}
        height={mainHeaderHeight}
        sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#FFFFFF" }}
        //   py={1}
        display={"flex"}
        // justifyContent={"space-between"}
        // alignItems={"center"}
        // py={"12px"}
      >
        <Container
          maxWidth={"lg"}
          sx={{
            display: "flex",
            px: { xs: 1, sm: 2 },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box display={"flex"} alignItems={"center"} height={"100%"}>
            <ButtonToUp />
          </Box>
          <Box flex={1} display={"flex"} justifyContent={"center"}>
            <Box
              flex={1}
              maxWidth={536}
              px={{
                xs: 1,
                sm: 2,
              }}
            >
              <AtsSearchInput />
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            height={"100%"}
            columnGap={1}
          >
            <ButtonTogglLanguage />
            <ButtonToggleDarkMode />
            {/* <AvatarSetting /> */}
          </Box>
        </Container>
      </Box>

      {/* 위키 카드스택 다이얼로그 헤더에 달려있음 */}
      {/* {openWikiDialog && ( */}
      <WikiCardStackDialogView
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onConfirm={() => {
          setIsDialogOpen(false);
        }}
        onClickExit={() => {
          setIsDialogOpen(false);
        }}
      />
      {/* )} */}

      <WikiDialogView onConfirm={() => {}} />
    </>
  );
});

export default AtsHeader;
