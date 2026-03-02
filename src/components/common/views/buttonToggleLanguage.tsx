import { Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useCallback } from "react";

const ButtonTogglLanguage = () => {
  const { i18n } = useTranslation("common");

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const toggleLanguage = useCallback(async () => {
    const prev = i18n.language;
    const nextLang = prev === "ko" ? "en" : "ko";
    Cookies.set("NEXT_LOCALE", nextLang, { expires: 365, path: "/" });
    router.push({ pathname, query }, asPath, { locale: nextLang });
  }, [i18n]);

  return (
    <Box width={"40px"} height={"40px"}>
      <AnimatePresence mode="wait" initial={false}>
        <IconButton
          onClick={() => {
            toggleLanguage();
          }}
          sx={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
        >
          <GTranslateIcon />
        </IconButton>
      </AnimatePresence>
    </Box>
  );
};

export default ButtonTogglLanguage;
