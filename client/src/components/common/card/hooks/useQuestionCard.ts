import { useCallback } from "react";
import { API_URL } from "@api/axiosConfig";
import { useMutation } from "@tanstack/react-query";

interface UseQuestionCardProps {
  questionId: number | string;
  userId: number | string;
  onCardClick?: (id: number | string) => void;
  onAnswerClick?: (id: number | string) => void;
}

interface DeleteQuestionVariables {
  userId: number | string;
}

export const useQuestionCard = ({
  questionId,
  userId,
  onCardClick,
  onAnswerClick,
}: UseQuestionCardProps) => {
  const deleteMutation = useMutation({
    mutationFn: async (variables: DeleteQuestionVariables) => {
      const res = await fetch(`${API_URL}questions/delete/${questionId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: variables.userId }),
      });

      if (!res.ok) {
        throw new Error(`삭제 실패: ${res.status}`);
      }
      return res.json();
    },
  });

  const handleTitleClick = useCallback(() => {
    if (onCardClick) onCardClick(questionId);
    else console.log("실패");
  }, [onCardClick, questionId]);

  const handleAnswerClick = useCallback(() => {
    if (onAnswerClick) onAnswerClick(questionId);
    else console.log("실패");
  }, [onAnswerClick, questionId]);

  const handleDeleteClick = useCallback(async () => {
    const isConfirmed = window.confirm("정말 이 질문을 삭제하시겠습니까?");
    if (isConfirmed) {
      deleteMutation.mutate({ userId });
    }
  }, [deleteMutation, userId]);

  return {
    handleTitleClick,
    handleAnswerClick,
    handleDeleteClick,
    isDeleting: deleteMutation.isPending,
  };
};
