import { useCallback } from "react";
import { axiosInstance } from "@api/axiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOpenCommonModal } from "@components/common/modal/hook/useOpenCommonModal";
// import { useNavigate } from "react-router-dom";

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
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: DeleteQuestionVariables) =>
      axiosInstance.delete(`/questions/delete/${questionId}`, {
        data: { userId: variables.userId },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-questions"] });
    },
    onError: (error) => {
      console.error(error);
      openModal({
        isOpen: true,
        type: "error",
        title: "삭제 실패",
        info: "오류가 발생했습니다. 다시 시도해 주세요.",
      });
    },
  });

  const handleTitleClick = useCallback(() => {
    if (onCardClick) onCardClick(questionId);
  }, [onCardClick, questionId]);

  const handleAnswerClick = useCallback(() => {
    if (onAnswerClick) onAnswerClick(questionId);
  }, [onAnswerClick, questionId]);

  const handleDeleteClick = useCallback(() => {
    openModal({
      isOpen: true,
      type: "confirm",
      title: "질문 삭제",
      info: "정말 이 질문을 삭제하시겠습니까?",
      onConfirm: () => {
        deleteMutation.mutate({ userId });
      },
    });
  }, [openModal, deleteMutation, userId]);

  return {
    handleTitleClick,
    handleAnswerClick,
    handleDeleteClick,
    isDeleting: deleteMutation.isPending,
  };
};
