import { Box, Button, Grid } from "@mui/material";
import DialogLarge from "client/components/common/dialog/dialogLarge";

// import WikiAccordion from "./wikiAccordion";

export interface IWikiCardDialogView {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;

  onClickExit?: () => void;
}

const WikiCardDialogView = ({
  open,
  setOpen,
  onConfirm,

  onClickExit,
}: IWikiCardDialogView) => {
  return (
    <></>
    // <DialogLarge
    //   open={open}
    //   setOpen={setOpen}
    //   onClickExit={onClickExit}
    //   isExitButton={false}
    // >
    //   <Box width={"100%"}>
    //     <Button variant="outlined" onClick={onClickExit}>
    //       나가기
    //     </Button>
    //     <Box>
    //       <WikiAccordion />
    //     </Box>
    //   </Box>
    // </DialogLarge>
  );
};

export default WikiCardDialogView;
