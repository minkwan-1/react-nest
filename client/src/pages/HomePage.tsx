import { Box } from "@mui/material";
import { PageContainer } from "@domains/layout/common";
import { MainContent, SideContent } from "@domains/home";

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
          gap: 3,
        }}
      >
        <Box sx={{ flex: 3, minWidth: 0 }}>
          <MainContent />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },

            flex: 1.5,
            minHeight: 0,
          }}
        >
          <SideContent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default HomePage;
