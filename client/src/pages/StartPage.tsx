import { Box, useMediaQuery, useTheme } from "@mui/material";
import { LeftSection, BackgroundImage } from "@domains/auth/index";

const StartPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        minHeight: "100vh",
      }}
    >
      <LeftSection />

      {!isSmallScreen && !isMediumScreen && <BackgroundImage />}
    </Box>
  );
};

export default StartPage;
