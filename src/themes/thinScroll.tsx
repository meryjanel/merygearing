export const thinScroll = {
  overflowY: "auto",
  // Firefox
  scrollbarWidth: "thin",
  // Chrome, Edge, Safari
  "&::-webkit-scrollbar": {
    width: "6px", // 세로 스크롤바 두께
    height: "6px", // 가로 스크롤바 두께
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent", // 배경색
  },
} as const;
