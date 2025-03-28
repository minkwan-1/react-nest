import { Box, useTheme } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { MainContent, ImageSection } from "@components/landing";

const LandingPage = () => {
  const theme = useTheme();

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 80px)",
          ...theme.applyStyles("light", {
            bgcolor: "#f8f8f8",
          }),
          ...theme.applyStyles("dark", {
            bgcolor: "#121212",
          }),
        }}
      >
        <MainContent />
        <ImageSection />
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
