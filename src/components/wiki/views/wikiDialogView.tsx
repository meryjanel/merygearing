import { Box, Button, Grid, IconButton } from "@mui/material";
import DialogLarge from "client/components/common/dialog/dialogLarge";
// import { useWikiCardStackContext } from "../contexts/wikiCardStackContext";
import WikiCardStackView from "./wikiCardStackView";
import useWikiStore from "client/stores/useWikiStore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import AtsSearchInput from "client/layouts/headers/views/atsSearchInput";
import { useThemeContext } from "client/contexts/themeContext";

export interface IWikiCardStackDialogView {
  onConfirm: () => void;

  onClickExit?: () => void;
}

const WikiDialogView = ({ onConfirm }: IWikiCardStackDialogView) => {
  const { isDarkMode, isXs } = useThemeContext();

  const isOpen = useWikiStore((s) => s.isDialogOpen);
  const setOpen = useWikiStore((s) => s.setIsDialogOpen);
  const addCard = useWikiStore((s) => s.addCard);
  const popCard = useWikiStore((s) => s.popCard);
  const resetCards = useWikiStore((s) => s.resetCards);
  //   const addCardClick = () => {
  //     addCard("음쉭", "절임");
  //   };

  const onClickExit = () => {
    setOpen(false);
    resetCards();
  };

  return (
    <DialogLarge
      open={isOpen}
      setOpen={setOpen}
      onClickExit={onClickExit}
      isExitButton={false}
    >
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        sx={{ backgroundColor: isDarkMode ? "#1e1e1ef2" : "#FFFFFF" }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          zIndex={1972}
          p={1}
          sx={{ backgroundColor: isDarkMode ? "#1e1e1ef2" : "#FFFFFF" }}
        >
          <IconButton
            onClick={popCard}
            sx={{ flexShrink: 0, aspectRatio: "1/1" }}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>

          <Box flex={1} maxWidth={536} px={{ xs: 1, sm: 2 }}>
            <AtsSearchInput />
          </Box>

          <IconButton onClick={onClickExit} sx={{ flexShrink: 0 }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>

          {/* <Button variant="outlined" onClick={onClickExit}>
            나가기
          </Button>

          <Button variant="outlined" onClick={() => addCard("asd")}>
            추가
          </Button>
          <Button variant="outlined" onClick={popCard}>
            삭제
          </Button> */}
        </Box>
        <Box
          height={"100%"}
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          pt={1}
          // bgcolor={"yellow"}
        >
          {/* <WikiAccordion /> */}
          <WikiCardStackView />
        </Box>
      </Box>
    </DialogLarge>
  );
};

export default WikiDialogView;
