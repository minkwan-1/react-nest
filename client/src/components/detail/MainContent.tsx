import { useEffect } from "react";
import { Box } from "@mui/material";
import "react-quill/dist/quill.snow.css";

import {
  useQuestionDetail,
  useAnswers,
  useAiAnswer,
  useAnswerSubmit,
} from "./hooks/index";

import { applyCodeBlockStyling } from "./utils/domUtils";
import { themeColors } from "./utils/styleUtils";

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

  // DOM 스타일링 적용
  useEffect(() => {
    if (!loading && question) {
      applyCodeBlockStyling(themeColors);
    }
  }, [loading, question]);

  return (
    <Box
      sx={{
        flex: 1.5,
        pr: { xs: "0", sm: "0", md: "2" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: themeColors.surface,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: themeColors.primary,
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: themeColors.primaryDark,
          },
        },
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
