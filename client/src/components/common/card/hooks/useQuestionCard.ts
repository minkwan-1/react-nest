import { useCallback } from "react";

interface UseQuestionCardProps {
  questionId: number | string;
  userId: number | string;
  onCardClick?: (id: number | string) => void;
  onAnswerClick?: (id: number | string) => void;
}

export const useQuestionCard = ({
  questionId,
  userId,
  onCardClick,
  onAnswerClick,
}: UseQuestionCardProps) => {
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
    if (!isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/questions/delete/${questionId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (!res.ok) throw new Error(`삭제 실패: ${res.status}`);
      alert("질문이 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 에러:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  }, [questionId, userId]);

  return {
    handleTitleClick,
    handleAnswerClick,
    handleDeleteClick,
  };
};
