import { useEffect } from "react";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { fetchQuestionsByUser } from "../api/fetchQuestionsByUser";
import { Question } from "@atom/question";

export const useUserQuestions = () => {
  const [userInfo] = useAtom(realUserInfo);
  const [, setQuestions] = useAtom(questionsAtom);

  const { data: userQuestions, isSuccess } = useQuery<Question[]>({
    queryKey: ["questions", "user", userInfo?.id],
    queryFn: () => fetchQuestionsByUser(userInfo!.id),
    enabled: !!userInfo?.id,
  });

  useEffect(() => {
    if (!userInfo?.id) {
      setQuestions([]);
      return;
    }
    if (isSuccess) {
      setQuestions(userQuestions);
    }
  }, [userInfo, isSuccess, userQuestions, setQuestions]);
};
