import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchAnswersByQuestionId,
  Answer,
  submitAnswer,
  SubmitAnswerRequest,
} from "../api/detail-api";

export const useFetchAnswersByQuestionId = (questionId: string | undefined) => {
  return useQuery<Answer[], Error>({
    queryKey: ["answers", questionId],
    queryFn: () => fetchAnswersByQuestionId(questionId),
    staleTime: 0,
    retry: false,
  });
};

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<Answer, Error, SubmitAnswerRequest>({
    mutationFn: submitAnswer,
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["answers", variables.questionId],
      });
    },
    onError: (error) => {
      console.error("답변 제출 실패:", error.message);
    },
  });
};
