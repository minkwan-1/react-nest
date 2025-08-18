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
    queryKey: ["questions", "user", userInfo?.user.id],
    queryFn: () => fetchQuestionsByUser(userInfo!.user.id),
    enabled: !!userInfo?.user.id,
  });

  useEffect(() => {
    if (!userInfo?.user.id) {
      setQuestions([]);
      return;
    }
    if (isSuccess) {
      setQuestions(userQuestions);
    }
  }, [userInfo, isSuccess, userQuestions, setQuestions]);
};
