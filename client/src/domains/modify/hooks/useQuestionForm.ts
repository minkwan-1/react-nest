import { useEffect, useState } from "react";
import { Question } from "./useQuestionDetail";

export const useQuestionForm = (initial?: Question | null) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setContent(initial.content);
      setTags(initial.tags);
    }
  }, [initial]);

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    isFormValid,
  };
};
