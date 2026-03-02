import { Box, Button, Card, Collapse, Slide, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group"; // MUI 설치 시 자동 포함됨
// import {
//   IcardAccordion,
//   useWikiCardAccordionContext,
// } from "../../contexts/wikiCardAccordionContext";
import { memo } from "react";

const WikiAccordion = () => {
  return <></>;
  //   const { cardAccordionList, addCard, moveCard, resetCards, nowIndex } =
  //     useWikiCardAccordionContext();

  //   return (
  //     <Box sx={{ p: 2 }}>
  //       <Button
  //         onClick={() => {
  //           addCard("음식", "절임\n");
  //         }}
  //       >
  //         추가
  //       </Button>
  //       <Button
  //         onClick={() => {
  //           resetCards();
  //         }}
  //       >
  //         삭제
  //       </Button>
  //       {/* TransitionGroup은 자식 요소가 제거될 때 애니메이션을 유지해줍니다 */}
  //       <Box></Box>
  //       <TransitionGroup>
  //         {cardAccordionList.map((card, idx) => {
  //           const isHidden = nowIndex > card.index + 5;
  //           return (
  //             <Slide
  //               key={card.index + "_" + idx}
  //               direction="up"
  //               timeout={{ enter: 200, exit: 500 }}
  //               enter={true}
  //               exit={true}
  //               style={{
  //                 zIndex: card.index,
  //                 display: !isHidden ? "block" : "none",
  //               }}
  //             >
  //               {
  //                 <Box>
  //                   <WikiCard card={card} idx={card.index} />
  //                 </Box>
  //               }
  //             </Slide>
  //           );
  //         })}
  //       </TransitionGroup>
  //     </Box>
  //   );
  // };

  // export default WikiAccordion;

  // interface IWikiCard {
  //   card: IcardAccordion;
  //   idx: number;
  // }
  // const WikiCard = ({ card, idx }: IWikiCard) => {
  //   const { cardAccordionList, addCard, moveCard, resetCards, nowIndex } =
  //     useWikiCardAccordionContext();
  //   return (
  //     <Box
  //       onClick={() => moveCard(card.index)}
  //       sx={{
  //         mb: -3, // 겹침 효과
  //         position: "relative",
  //         //   zIndex: card.index,
  //         cursor: "pointer",
  //         borderRadius: "12px",
  //         boxShadow: 3,
  //         transition: "all 0.3s ease",
  //         // 마지막 카드가 아니면 상단만 보이도록 높이 조절 가능
  //         height: "80px",
  //         backgroundColor: "skyblue",
  //         "&:hover": { transform: "translateY(-5px)", zIndex: 100 },
  //       }}
  //     >
  //       <Box p={2}>
  //         <Typography variant="h6" color="primary">
  //           {card.key + nowIndex + " " + card.index}
  //         </Typography>
  //         {idx === cardAccordionList.length - 1 && (
  //           <Box mt={2}>
  //             <Typography>{card.key}</Typography>
  //           </Box>
  //         )}
  //       </Box>
  //     </Box>
  // );
};
