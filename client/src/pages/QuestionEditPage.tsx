import { Box, Container } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { QuestionForm } from "../components/edit/QuestionForm";
import {
  PageHeader,
  BackgroundElements,
  useQuestionForm,
} from "@components/edit";

export default function QuestionEditPage() {
  const mainColor = "#03cb84";
  const {
    title,
    setTitle,
    content,
    setContent,
    tags,
    previewMode,
    setPreviewMode,
    isSubmitting,
    handleTagsChange,
    handleSubmit,
  } = useQuestionForm({
    onSuccess: () => {
      // 성공 시 추가 작업을 수행할 수 있음 (ex: 리다이렉트)
    },
  });

  return (
    <PageContainer>
      <ComponentWrapper>
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              position: "relative",
              padding: { xs: 2, sm: 3 },
              maxWidth: 1200,
              mx: "auto",
              zIndex: 1,
            }}
          >
            {/* 배경 요소 */}
            <BackgroundElements mainColor={mainColor} />

            {/* 헤더 */}
            <PageHeader
              title="질문 등록하기"
              subtitle="궁금한 점을 명확하게 작성하여 커뮤니티에서 도움을 받아보세요."
              mainColor={mainColor}
            />

            {/* 폼 */}
            <QuestionForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              tags={tags}
              handleTagsChange={handleTagsChange}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              mainColor={mainColor}
            />
          </Box>
        </Container>
      </ComponentWrapper>
    </PageContainer>
  );
}
