import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

import { Box, Container } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { PageHeader, LoadingScreen, QuestionForm } from "@components/modify";

import {
  useQuestionDetail,
  useQuestionForm,
  useModifyQuestionSubmit,
} from "@components/modify/hooks/index";

import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";

const ModifyQuestionPage = () => {
  const mainColor = "#b8dae1";
  const { id } = useParams();
  const [userInfo] = useAtom(realUserInfo);
  const { question, loading } = useQuestionDetail(id);
  const { data } = useFetchMyInfo(question?.userId);

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

  const createdDate = question?.createdAt;

  const author = data?.nickname;
  const authorProfileImage = data?.profileImageUrl;

  console.log(author);

  return (
    <PageContainer>
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
            createdDate={createdDate}
            author={author}
            authorProfileImage={authorProfileImage}
          />
        </Box>
      </Container>
    </PageContainer>
  );
};

export default ModifyQuestionPage;
