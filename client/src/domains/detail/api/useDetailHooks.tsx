import { useQuery } from "@tanstack/react-query";
import { fetchAnswersByQuestionId, Answer } from "../api/detail-api";

export const useFetchAnswersByQuestionId = (questionId: string | undefined) => {
  return useQuery<Answer[], Error>({
    queryKey: ["answers", questionId],
    queryFn: () => fetchAnswersByQuestionId(questionId),
    staleTime: 0,
    retry: false,
  });
};
