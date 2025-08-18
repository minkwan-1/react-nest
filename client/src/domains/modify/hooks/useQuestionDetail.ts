import { useQuery } from "@tanstack/react-query";
import { fetchQuestionDetail } from "../api/fetchQuestionDetail";

export interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useQuestionDetail = (questionId?: string) => {
  const { data: question, isPending: loading } = useQuery<Question>({
    queryKey: ["questions", questionId],

    queryFn: () => fetchQuestionDetail(questionId!),

    enabled: !!questionId,
  });

  return { question: question ?? null, loading };
};
