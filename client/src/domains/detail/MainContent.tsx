import { useEffect } from "react";

import { Box } from "@mui/material";

import "react-quill/dist/quill.snow.css";

import {
  useQuestionDetail,
  useAnswers,
  useAiAnswer,
  useAnswerSubmit,
} from "./hooks/index";

import {
  DetailQuestionTitle,
  DetailQuestionContent,
  SubmitSuccessSnackbar,
  AnswerList,
  AnswerEditor,
  LoadingFallback,
  QuestionNotFound,
  AnswerRenderer,
} from "./main-content";

const MainContent = () => {
  const { id, question, loading, user } = useQuestionDetail();

  const { answers, answersLoading, answersError, fetchAnswers } =
    useAnswers(id);

  const { aiAnswer, aiLoading, aiError, fetchAiAnswer } = useAiAnswer();

  const {
    userAnswer,
    setUserAnswer,
    isSubmittingAnswer,
    submitError,
    submitSuccess,
    handleSubmitAnswer,
    handleCloseSnackbar,
  } = useAnswerSubmit(id, user?.id, fetchAnswers);

  // question이 로드된 후 AI 답변 가져오기
  useEffect(() => {
    if (question && !loading) {
      fetchAiAnswer(question.id);
    }
  }, [question, loading, fetchAiAnswer]);

  console.log("AI 답변: ", aiAnswer);
  console.log("일반 사용자 답변: ", answers);

  return (
    <Box
      sx={{
        flex: 1.5,
        pr: { xs: "0", sm: "0", md: "2" },
        overflowY: "auto",
        height: "100%",
      }}
    >
      {loading ? (
        <LoadingFallback />
      ) : !question ? (
        <QuestionNotFound />
      ) : (
        <>
          <DetailQuestionTitle />
          <DetailQuestionContent />

          <AnswerEditor
            submitError={submitError}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            isSubmittingAnswer={isSubmittingAnswer}
            handleSubmitAnswer={handleSubmitAnswer}
          />

          <AnswerList
            aiAnswer={aiAnswer}
            aiLoading={aiLoading}
            aiError={aiError}
            answersLoading={answersLoading}
            answersError={answersError}
            answers={answers}
            renderAnswers={() => (
              <AnswerRenderer aiAnswer={aiAnswer} answers={answers} />
            )}
          />

          <SubmitSuccessSnackbar
            submitSuccess={submitSuccess}
            handleCloseSnackbar={handleCloseSnackbar}
          />
        </>
      )}
    </Box>
  );
};

export default MainContent;
