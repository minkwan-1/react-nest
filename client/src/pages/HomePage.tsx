// HomePage.tsx
import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { MainContent } from "@components/home";

const HomePage = () => {
  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          padding: 3,
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          height: "calc(100vh - 80px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <MainContent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default HomePage;
