import { useState, useCallback } from "react";
import { UseAnswerSubmitReturn } from "../types";
import { useSubmitAnswer } from "../api/useDetailHooks";

export const useAnswerSubmit = (
  questionId: string | undefined,
  userId: string | undefined,
  onSuccess: () => void
): UseAnswerSubmitReturn => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { mutate: submitAnswerMutation, isPending: isSubmittingAnswer } =
    useSubmitAnswer();

  const handleSubmitAnswer = useCallback(async () => {
    console.log(userAnswer);
    console.log(questionId);
    console.log(userId);

    if (!userAnswer.trim() || !questionId || !userId) {
      setSubmitError("답변 내용을 입력해주세요.");
      return;
    }

    setSubmitError(null);

    submitAnswerMutation(
      {
        questionId,
        content: userAnswer,
        userId,
      },
      {
        onSuccess: () => {
          setUserAnswer("");
          setSubmitSuccess(true);
          onSuccess();
        },
        onError: (error) => {
          const errorMessage =
            error.message || "알 수 없는 오류가 발생했습니다.";
          console.error("답변 등록 실패:", errorMessage);
          setSubmitError(errorMessage);
        },
      }
    );
  }, [userAnswer, questionId, userId, onSuccess, submitAnswerMutation]);

  const handleCloseSnackbar = useCallback(() => {
    setSubmitSuccess(false);
    setSubmitError(null);
  }, []);

  return {
    userAnswer,
    setUserAnswer,
    isSubmittingAnswer,
    submitError,
    submitSuccess,
    handleSubmitAnswer,
    handleCloseSnackbar,
  };
};
