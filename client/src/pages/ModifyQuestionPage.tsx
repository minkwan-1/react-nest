import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { PageContainer, ComponentWrapper } from "@components/layout/common";
import { useModifyQuestion } from "@components/modify/hooks/useModifyQuestion";
import {
  BackgroundElements,
  PageHeader,
  LoadingScreen,
  QuestionForm,
} from "@components/modify";

const ModifyQuestionPage = () => {
  const mainColor = "#b8dae1";
  const { id } = useParams();

  // 커스텀 훅
  const {
    question,
    loading,
    isSubmitting,
    title,
    content,
    setTitle,
    tags,
    setContent,
    handleTagsChange,
    handleSubmit,
    isFormValid,
  } = useModifyQuestion({ questionId: id });

  console.log({ loading, question, title, content, tags });

  // 로딩 중일 때
  if (loading) {
    return <LoadingScreen />;
  }

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
            {/* background element */}
            <BackgroundElements mainColor={mainColor} />

            {/* page header */}
            <PageHeader
              title="질문 수정하기"
              subtitle="질문을 더 명확하게 다듬어 커뮤니티의 도움을 받아보세요."
              mainColor={mainColor}
            />

            {/* question form */}
            <QuestionForm
              handleSubmit={handleSubmit}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              tags={tags}
              handleTagsChange={handleTagsChange}
              isSubmitting={isSubmitting}
              isFormValid={isFormValid}
            />
          </Box>
        </Container>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default ModifyQuestionPage;
