import { useCallback } from "react";
import { axiosInstance } from "@api/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useOpenCommonModal } from "@components/common/modal/hook/useOpenCommonModal";

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
  const { openModal } = useOpenCommonModal();
  const deleteMutation = useMutation({
    mutationFn: async (variables: DeleteQuestionVariables) => {
      const response = await axiosInstance.delete(
        `/questions/delete/${questionId}`,
        {
          data: { userId: variables.userId },
        }
      );
      return response.data;
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
    console.log("클릭");
    openModal({
      isOpen: true,
      type: "info",
      title: "",
      info: "정말 이 질문을 삭제하시겠습니까?",
      navigateTo: "/my",
    });
    deleteMutation.mutate({ userId });
  }, [deleteMutation, userId]);

  return {
    handleTitleClick,
    handleAnswerClick,
    handleDeleteClick,
    isDeleting: deleteMutation.isPending,
  };
};
