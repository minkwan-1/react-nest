import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { modifyQuestion } from "../api/modifyQuestion";
import { useOpenCommonModal } from "@domains/common/modal/hook/useOpenCommonModal";

export const useModifyQuestionSubmit = (
  questionId: string | undefined,
  userId: string | undefined,
  formData: {
    title: string;
    content: string;
    tags: string[];
  }
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openModal } = useOpenCommonModal();
  const [, setQuestions] = useAtom(questionsAtom);

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: modifyQuestion,
    onSuccess: (data, variables) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === Number(variables.questionId) ? { ...q, ...data } : q
        )
      );

      queryClient.setQueryData(["questions", variables.questionId], data);

      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            queryKey[0] === "questions" ||
            queryKey[0] === "question" ||
            (Array.isArray(queryKey) && queryKey.includes(variables.questionId))
          );
        },
      });

      openModal({
        isOpen: true,
        type: "info",
        title: "성공",
        info: "질문이 성공적으로 수정되었습니다.",
        onConfirm: () => navigate(`/questions/${variables.questionId}`),
      });
    },
    onError: (err) => {
      console.error(err);
      openModal({
        isOpen: true,
        type: "error",
        title: "오류",
        info: "질문 수정 중 오류가 발생했습니다. 다시 시도해주세요.",
        navigateTo: "undefined",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionId || !userId) return;

    mutate({
      questionId,
      userId,
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
    });
  };

  return { handleSubmit, isSubmitting };
};
