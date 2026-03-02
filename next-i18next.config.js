module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },
  // 개발 모드에서 수정 시 즉시 반영
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
