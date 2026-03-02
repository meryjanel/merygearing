import { Box, Button, Grid } from "@mui/material";
import DialogLarge from "client/components/common/dialog/dialogLarge";
import { useWikiCardStackContext } from "../contexts/wikiCardStackContext";
import WikiCardStackView from "./wikiCardStackView";

export interface IWikiCardStackDialogView {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;

  onClickExit?: () => void;
}

const WikiCardStackDialogView = ({
  open,
  setOpen,
  onConfirm,

  onClickExit,
}: IWikiCardStackDialogView) => {
  const { addCard, popCard, nowIndex } = useWikiCardStackContext();

  const addCardClick = () => {
    addCard("음쉭", "절임");
  };

  return (
    <DialogLarge
      open={open}
      setOpen={setOpen}
      onClickExit={onClickExit}
      isExitButton={false}
    >
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box display={"flex"}>
          <Button variant="outlined" onClick={onClickExit}>
            나가기
          </Button>

          <Button variant="outlined" onClick={addCardClick}>
            추가
          </Button>
          <Button variant="outlined" onClick={popCard}>
            삭제
          </Button>
        </Box>
        <Box
          height={"100%"}
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          //   bgcolor={"yellow"}
        >
          토잉
          {/* <WikiAccordion /> */}
          <WikiCardStackView />
        </Box>
      </Box>
    </DialogLarge>
  );
};

export default WikiCardStackDialogView;
