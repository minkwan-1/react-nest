import { useEffect, useState } from "react";
import { API_URL } from "@api/axiosConfig";
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
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!questionId) return;

    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}questions/${questionId}`);
        if (!res.ok) throw new Error("질문을 불러올 수 없습니다.");
        const data = await res.json();
        setQuestion(data);
      } catch (err) {
        console.error(err);
        alert("질문을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  return { question, loading };
};
