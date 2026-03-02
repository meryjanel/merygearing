import { Box, Button } from "@mui/material";

import { useState } from "react";

import WikiCardStackDialogView from "./wikiCardStackDialogView";
import { WikiCardStackContextProvider } from "../contexts/wikiCardStackContext";

const WikiCardStackSampleView = () => {
  const [openWikiDialog, setOpenWikiDialog] = useState(false);

  return (
    // <WikiCardStackContextProvider>
    <>
      <Box>위키카드스택샘플뷰 최상단</Box>
      <Button
        variant={"contained"}
        onClick={() => {
          setOpenWikiDialog(true);
        }}
      >
        다이알로그
      </Button>

      {/* 에러 모달 */}

      {/* {openWikiDialog && ( */}
      <WikiCardStackDialogView
        open={openWikiDialog}
        setOpen={setOpenWikiDialog}
        onConfirm={() => {
          setOpenWikiDialog(false);
        }}
        onClickExit={() => {
          setOpenWikiDialog(false);
        }}
      />
      {/* )} */}
    </>
    // </WikiCardStackContextProvider>
  );
};

export default WikiCardStackSampleView;

// 위의 스크롤 유발 이슈생기면 고민하기
// Slide의 컨테이너 참조 설정 (container prop)
// MUI Slide API에는 container라는 속성이 있습니다. 슬라이드가 어느 영역 안에서만 움직여야 하는지 명시해 주면, 그 영역 밖으로 나가는 순간 사라지며 스크롤을 유발하지 않습니다.
// javascript
// const containerRef = React.useRef(null);

// // ... 중략 ...

// <Box ref={containerRef} sx={{ overflow: 'hidden' }}>
//   <Slide container={containerRef.current} ... >
//     <Card />
//   </Slide>
// </Box>
