import { useQuery } from "@tanstack/react-query";

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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch(
        `http://localhost:3000/questions?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );
      if (!res.ok) throw new Error("질문 목록 불러오기 실패");
      return res.json();
    },
  });
};
