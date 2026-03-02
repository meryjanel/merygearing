import { Box, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "client/contexts/themeContext";
import { motion, AnimatePresence } from "framer-motion";

const ButtonToggleDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <Box width={"40px"} height={"40px"}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={"buttonToggleDarimodemotion" + isDarkMode}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <IconButton
            onClick={toggleDarkMode}
            sx={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default ButtonToggleDarkMode;
