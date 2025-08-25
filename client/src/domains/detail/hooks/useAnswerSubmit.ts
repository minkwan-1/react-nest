// hooks/useAnswerSubmit.ts
import { useState, useCallback } from "react";
import { UseAnswerSubmitReturn } from "../types";
import { apiService } from "../services/apiService";

export const useAnswerSubmit = (
  questionId: string | undefined,
  userId: string | undefined,
  onSuccess: () => void
): UseAnswerSubmitReturn => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitAnswer = useCallback(async () => {
    console.log(userAnswer);
    console.log(questionId);
    console.log(userId);

    if (!userAnswer.trim() || !questionId || !userId) {
      setSubmitError("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmittingAnswer(true);
    setSubmitError(null);

    try {
      await apiService.answer.submitAnswer({
        questionId,
        content: userAnswer,
        userId,
      });

      setUserAnswer("");
      setSubmitSuccess(true);
      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      console.error("답변 등록 실패:", errorMessage);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmittingAnswer(false);
    }
  }, [userAnswer, questionId, userId, onSuccess]);

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
