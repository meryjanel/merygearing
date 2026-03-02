import { Box, Button } from "@mui/material";
// import { WikiCardAccordionContextProvider } from "../../contexts/wikiCardAccordionContext";
// import WikiAccordion from "./wikiAccordion";
import { useState } from "react";
import WikiCardDialogView from "./wikiCardDialogView";

const WikiCardAccordionView = () => {
  const [openWikiDialog, setOpenWikiDialog] = useState(false);

  return (
    <></>
    // <WikiCardAccordionContextProvider>
    //   <Box>위키카드아코디언뷰 최상다ㅏ</Box>
    //   <Button
    //     variant={"contained"}
    //     onClick={() => {
    //       setOpenWikiDialog(true);
    //     }}
    //   >
    //     다이알로그
    //   </Button>
    //   <Box sx={{ overflowY: "hidden" }}>
    //     {/* 아코디언 카드가 떨어질때 스크롤 유발때매 추가 */}
    //     {/* <WikiAccordion /> */}
    //   </Box>
    //   <Box>위키카드아코디언뷰 최하단</Box>

    //   {/* 에러 모달 */}
    //   {/* {openWikiDialog && ( */}
    //   <WikiCardDialogView
    //     open={openWikiDialog}
    //     setOpen={setOpenWikiDialog}
    //     onConfirm={() => {
    //       setOpenWikiDialog(false);
    //     }}
    //     onClickExit={() => {
    //       setOpenWikiDialog(false);
    //     }}
    //   />
    //   {/* )} */}
    // </WikiCardAccordionContextProvider>
  );
};

export default WikiCardAccordionView;

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
