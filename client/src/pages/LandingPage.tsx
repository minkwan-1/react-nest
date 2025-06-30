import { Box, useTheme } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { MainContent } from "@components/landing";
import LetterGlitch from "@components/landing/LetterGlitch";

const LandingPage = () => {
  const theme = useTheme();

  return (
    <PageContainer sx={{ height: "auto" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          ...theme.applyStyles("light", {
            filter: "brightness(0.7) contrast(0.8)",
          }),
          ...theme.applyStyles("dark", {
            filter: "brightness(0.7) contrast(0.8)",
          }),
        }}
      >
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: 0.5, md: 1 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1200px",
            height: "85vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },

            ...theme.applyStyles("light", {
              backgroundColor: "rgba(20, 20, 20, 0.6)",
              color: theme.palette.text.primary,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "rgba(20, 20, 20, 0.6)",
              color: theme.palette.text.primary,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }),

            borderRadius: 3,
            padding: { xs: 3, md: 4 },

            "& *": {
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              fontWeight: "500",
            },

            transition: "all 0.3s ease-in-out",
          }}
        >
          <MainContent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
