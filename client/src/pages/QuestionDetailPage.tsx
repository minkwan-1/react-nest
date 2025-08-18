import { Box } from "@mui/material";
import { PageContainer } from "@domains/layout/common";
import { MainContent } from "@domains/detail/index";

const QuestionDetailPage = () => {
  return (
    <PageContainer>
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          minHeight: "calc(100vh - 80px)",
          mx: "auto",
          padding: "30px",
          minWidth: 0,
        }}
      >
        <MainContent />
      </Box>
    </PageContainer>
  );
};

export default QuestionDetailPage;
