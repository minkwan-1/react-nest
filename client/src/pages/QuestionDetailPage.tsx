import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { MainContent } from "@components/detail/index";

const QuestionDetailPage = () => {
  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
          maxWidth: "1000px",
          mx: "auto",
          width: "100%",
          minHeight: "calc(100vh - 80px)",
          height: { xs: "auto", md: "calc(100vh - 80px)" },
          overflow: "hidden",
          position: "relative",

          padding: "30px",
        }}
      >
        {/* 메인 컨텐츠 영역 */}
        <Box
          sx={{
            flex: { xs: "1 1 auto", md: "1.5 1 0%" },
            minWidth: 0, // flex 아이템 축소 허용
            order: { xs: 1, md: 1 },
          }}
        >
          <MainContent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default QuestionDetailPage;
