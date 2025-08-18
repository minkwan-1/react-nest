import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { axiosInstance } from "@api/axiosConfig";

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt: string | Date;
  user: { id: number | string; name: string };
  tags?: string[];
}

interface FetchQuestionsResponse {
  items: Question[];
  total: number;
  totalPages: number;
  page: number;
}

export const useQuestions = (
  page: number,
  limit: number = 5,
  search: string = ""
) => {
  return useQuery<FetchQuestionsResponse>({
    queryKey: ["questions", page, search],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `questions?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
