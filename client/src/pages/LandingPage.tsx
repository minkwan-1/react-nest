import { Box, useTheme, useMediaQuery } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { MainContent, ImageSection } from "@components/landing";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "calc(100vh - 80px)",
          maxWidth: "1300px",
          mx: "auto",
          ...theme.applyStyles("light", {
            backgroundColor: "#ffffff",
          }),
          ...theme.applyStyles("dark", {
            bgcolor: "#121212",
          }),
        }}
      >
        <MainContent />
        <ImageSection isMobile={isMobile} />
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
