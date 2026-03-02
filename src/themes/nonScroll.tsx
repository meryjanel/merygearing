export const nonScroll = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "80px",
  },
} as const;
