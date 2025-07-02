import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

import { Box, Container } from "@mui/material";
import { PageContainer, ComponentWrapper } from "@components/layout/common";
import {
  BackgroundElements,
  PageHeader,
  LoadingScreen,
  QuestionForm,
} from "@components/modify";

import {
  useQuestionDetail,
  useQuestionForm,
  useModifyQuestionSubmit,
} from "@components/modify/hooks/index";

const ModifyQuestionPage = () => {
  const mainColor = "#b8dae1";
  const { id } = useParams();
  const [userInfo] = useAtom(realUserInfo);

  const { question, loading } = useQuestionDetail(id);
  const { title, setTitle, content, setContent, tags, setTags, isFormValid } =
    useQuestionForm(question);

  const { handleSubmit, isSubmitting } = useModifyQuestionSubmit(
    id,
    userInfo?.id,
    {
      title,
      content,
      tags,
    }
  );

  if (loading) return <LoadingScreen />;

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
            <BackgroundElements mainColor={mainColor} />
            <PageHeader
              title="질문 수정하기"
              subtitle="질문을 더 명확하게 다듬어 커뮤니티의 도움을 받아보세요."
              mainColor={mainColor}
            />
            <QuestionForm
              handleSubmit={handleSubmit}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              tags={tags}
              setTags={setTags}
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
