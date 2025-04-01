import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import {
  SectionDivider,
  MainContent,
  SideContent,
} from "@components/detail/index";

const QuestionDetailPage = () => {
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
        {/* 좌우 구분 디바이더 */}
        <SectionDivider />

        {/* 메인 컨텐츠 영역 */}
        <MainContent />

        {/* 사이드 컨텐츠 */}
        <SideContent />
      </Box>

      {/* 글로벌 작성 버튼 (우측 하단에 고정) */}
    </PageContainer>
  );
};

export default QuestionDetailPage;
