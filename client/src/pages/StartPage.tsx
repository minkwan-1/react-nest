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
        ...theme.applyStyles("light", {
          bgcolor: "#f0f2f5",
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        }),
        ...theme.applyStyles("dark", {
          bgcolor: "#121212",
          backgroundImage: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
        }),
      }}
    >
      <LeftSection />

      {!isSmallScreen && !isMediumScreen && <BackgroundImage />}
    </Box>
  );
};

export default StartPage;
