// hooks/useQuestionDetail.ts
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { realUserInfo } from "@atom/auth";
import { Question, UseQuestionDetailReturn } from "../types";

export const useQuestionDetail = (): UseQuestionDetailReturn => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [questions] = useAtom(questionsAtom);
  const [loading, setLoading] = useState(true);
  const [userInfo] = useAtom(realUserInfo);
  console.log(userInfo);
  const user = userInfo?.user || null;

  console.log("id는?: ", id);

  useEffect(() => {
    if (!id || !questions || questions.length === 0) {
      setLoading(false);
      return;
    }

    const foundQuestion = questions.find((q) => q.id === parseInt(id));

    const timer = setTimeout(() => {
      setQuestion(foundQuestion || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, questions]);

  return {
    id,
    question,
    loading,
    user,
  };
};
