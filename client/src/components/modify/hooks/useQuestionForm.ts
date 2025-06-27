import { useEffect, useState } from "react";
import { Question } from "./useQuestionDetail";

export const useQuestionForm = (initial?: Question | null) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setContent(initial.content);
      setTags(initial.tags);
      setTagsInput(initial.tags.join(", "));
    }
  }, [initial]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTagsInput(input);
    setTags(
      input
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    );
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return {
    title,
    setTitle,
    content,
    setContent,
    tags,
    tagsInput,
    handleTagsChange,
    isFormValid,
  };
};
