import { Box, useTheme } from "@mui/material";
import {
  BackgroundPattern,
  MainLogo,
  WelcomeText,
  FeatureList,
  DecorativeElements,
} from "./background/index";

const BackgroundImage = () => {
  const theme = useTheme();
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
        ...theme.applyStyles("light", {
          background: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
        }),
        ...theme.applyStyles("dark", {
          background: "linear-gradient(135deg, #222222 0%, #333333 100%)",
        }),
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
