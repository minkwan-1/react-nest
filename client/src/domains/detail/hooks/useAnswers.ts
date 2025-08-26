import { useFetchAnswersByQuestionId } from "../api/useDetailHooks";
import { UseAnswersReturn, Answer } from "../types";

export const useAnswers = (
  questionId: string | undefined
): UseAnswersReturn => {
  const { data, isLoading, error, refetch } =
    useFetchAnswersByQuestionId(questionId);

  return {
    answers: (data ?? []) as Answer[],
    answersLoading: isLoading,
    answersError: error?.message ?? null,
    fetchAnswers: () => refetch() as unknown as Promise<void>,
  };
};
