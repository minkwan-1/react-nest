import { Box } from "@mui/material";
import {
  BackgroundPattern,
  MainLogo,
  WelcomeText,
  FeatureList,
  DecorativeElements,
} from "./background/index";

const BackgroundImage = () => {
  const keyColor = "#b8dae1";
  return (
    <Box
      sx={{
        width: "50%",
        p: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundPattern keyColor={keyColor} />

      <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <MainLogo keyColor={keyColor} />
        <WelcomeText />
        <FeatureList keyColor={keyColor} />
      </Box>

      <DecorativeElements keyColor={keyColor} />
    </Box>
  );
};

export default BackgroundImage;
