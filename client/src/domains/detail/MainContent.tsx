import { useEffect } from "react";

import { Box } from "@mui/material";
import { axiosInstance } from "@api/axiosConfig";
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
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MainContent = () => {
  const { id } = useParams();

  const { loading, user } = useQuestionDetail();

  const { answers, answersLoading, answersError, fetchAnswers } =
    useAnswers(id);

  const { aiAnswer, aiLoading, aiError, fetchAiAnswer } = useAiAnswer();

  const fetchQuestionById = async (questionId: string) => {
    const response = await axiosInstance.get(`questions/detail/${questionId}`);

    return response.data;
  };

  const { data: question } = useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchQuestionById(id as string),
  });

  const {
    userAnswer,
    setUserAnswer,
    isSubmittingAnswer,
    submitError,
    submitSuccess,
    handleSubmitAnswer,
    handleCloseSnackbar,
  } = useAnswerSubmit(id, user?.id, fetchAnswers);

  useEffect(() => {
    if (question && !loading) {
      fetchAiAnswer(question.id);
    }
  }, [question, loading, fetchAiAnswer]);

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
          <DetailQuestionContent question={question} />

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
