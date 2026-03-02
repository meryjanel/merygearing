import { Box, IconButton } from "@mui/material";
import BungalowIcon from "@mui/icons-material/Bungalow";
import { useEffect, useState } from "react";

const ButtonToUp = () => {
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    setPosition(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Box width={"40px"} height={"40px"}>
      <IconButton
        disabled={position === 0}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        sx={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
      >
        <BungalowIcon />
      </IconButton>
    </Box>
  );
};

export default ButtonToUp;
