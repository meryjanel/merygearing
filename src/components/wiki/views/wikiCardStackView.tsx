import { Box, Button, Card, Collapse, Slide, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group"; // MUI 설치 시 자동 포함됨
// import {
//   IcardAccordion,
//   useWikiCardAccordionContext,
// } from "../../contexts/wikiCardAccordionContext";
import { memo, useMemo } from "react";
import {
  IcardStack,
  useWikiCardStackContext,
} from "../contexts/wikiCardStackContext";
import useWikiStore, { IwikiCard } from "client/stores/useWikiStore";
import WikiCardView from "./wikiCardView";

const WikiCardStackView = () => {
  // const { cardStackList, nowIndex } = useWikiCardStackContext();

  const cardStackList = useWikiStore((s) => s.cardStackList);
  const nowIndex = useWikiStore((s) => s.nowIndex);

  return (
    <Box position={"relative"} height={"100%"}>
      <TransitionGroup>
        {cardStackList?.map((card, idx) => {
          const isHidden = card.index < nowIndex - 1;

          if (isHidden) return null;

          return (
            <Slide
              key={card.index + "_" + idx}
              direction="down"
              timeout={{ enter: 500, exit: 200 }}
              style={{
                zIndex: card.index,
                // display: isHidden ? "none" : "block",

                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                // height: "100%",
              }}
            >
              <Box position={"relative"} height={"100%"}>
                <WikiCardLayout card={card} idx={card.index} />
              </Box>
            </Slide>
          );
        })}
      </TransitionGroup>
    </Box>
  );
};

export default WikiCardStackView;

interface IWikiCard {
  card: IwikiCard;
  idx: number;
}
const WikiCardLayout = ({ card, idx }: IWikiCard) => {
  const nowIndex = useWikiStore((s) => s.nowIndex);
  // const { cardStackList, addCard, moveCard, resetCards, nowIndex } =
  //   useWikiCardStackContext();

  const isFocused = useMemo(() => card.index === nowIndex, [nowIndex, card]);

  return (
    <Box
      position={"absolute"}
      zIndex={card.index}
      borderRadius={"12px"}
      boxShadow={3}
      width={"100%"}
      top={isFocused ? 0 : -6}
      height={"100%"}
      sx={{
        zIndex: card.index,
        transition: "all 0.3s ease",
        opacity: isFocused ? 1 : 0.6,
        filter: isFocused ? "none" : "grayscale(0.8) brightness(0.7)",
        transform: isFocused ? "scale(1)" : "scale(0.95)",
      }}
    >
      <Box
        // p={2}
        width={"100%"}
        height={"100%"}
        // bgcolor={"blue"}
        position={"relative"}
      >
        <WikiCardView id={card.id} />

        {/* <Typography variant="h6" color="primary">
          {card.id + nowIndex + " " + card.index}
        </Typography>
        {
          // idx === cardStackList.length - 1
          true && (
            <Box mt={2}>
              <Typography>{card.id}</Typography>
            </Box>
          )
        } */}
      </Box>
    </Box>
  );
};
