import { Box, Dialog, IconButton, Slide, SlideProps } from "@mui/material";
import React from "react";

export interface IDialogLarge {
  open: boolean;

  setOpen: (open: boolean) => void;
  children?: React.ReactNode;

  onClickExit?: () => void;
  isExitButton?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide ref={ref} {...props} />;
});

const DialogLarge = ({
  open,
  setOpen,
  children,
  onClickExit,
  isExitButton = true,
}: IDialogLarge) => {
  return (
    <Dialog
      //   onClose={handleClose}
      fullScreen
      open={open}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClickExit();
          event.preventDefault();
        }
      }}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: {
          timeout: { enter: 200, exit: 300 },
          direction: "down",
          // 다이얼로그 포커스 이슈로 추가
          onExiting: () => {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          },
        },
      }}
      maxWidth={false}
      fullWidth={true}
      sx={{
        // maxWidth: "80%",
        ".MuiDialog-paper": {
          borderRadius: "20px",
          overflow: "hidden",
          margin: 0,
          width: { xs: "95dvw", sm: "90dvw", md: "80dvw" },
          height: { xs: "95dvh" },
          maxWidth: "490px",
        },
      }}
    >
      <Box
        position={"relative"}
        height={"100%"}
        // padding={"20px"}
      >
        {isExitButton && (
          <Box position={"absolute"} right={10} top={10}>
            <IconButton
              onClick={() => {
                if (!!onClickExit) {
                  onClickExit();
                }
                setOpen(false);
              }}
            ></IconButton>
          </Box>
        )}
        {children ?? <></>}
      </Box>
    </Dialog>
  );
};

export default DialogLarge;
