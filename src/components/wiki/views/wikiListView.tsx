import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import WikiListResourceView from "./wiKiListResourceView";
import WikiListBuildingView from "./wikiListBuildingView";

const WikiListView = () => {
  return (
    <Container maxWidth={"md"}>
      <WikiListBuildingView />
      <WikiListResourceView />
    </Container>
  );
};

export default WikiListView;
