import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { imageService } from "../service/imageService";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { axiosInstance } from "@api/axiosConfig";

// 질문 생성 API (기존과 동일)
const createQuestion = async ({
  title,
  content,
  tags,
  userId,
}: {
  title: string;
  content: string;
  tags: string[];
  userId: string;
}) => {
  const processedContent = await imageService.processContentImages(content);

  const response = await axiosInstance.post("questions", {
    title,
    content: processedContent,
    tags,
    userId,
  });
  return response.data;
};

const fetchAiAnswerById = async (questionId: string) => {
  const response = await axiosInstance.get(`api/ask-ai/${questionId}`);
  return response.data;
};

export const useQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const [userInfo] = useAtom(realUserInfo);
  const [, setQuestions] = useAtom(questionsAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const { mutate: submitQuestion, isPending: isSubmitting } = useMutation({
    mutationFn: createQuestion,
    onSuccess: async (createdQuestion) => {
      // ✨ 스켈레톤 테스트를 위한 1.5초 지연
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 질문 목록 관련 쿼리를 무효화하여 다른 페이지에서 최신 목록을 볼 수 있도록 합니다.
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setQuestions((prev) => [...prev, createdQuestion]);

      try {
        console.log(`AI 답변 요청 (ID: ${createdQuestion.id})`);
        const aiResponse = await fetchAiAnswerById(createdQuestion.id);
        console.log("AI 응답:", aiResponse);
        // 필요 시 AI 응답을 별도 상태에 저장하거나 캐시에 추가할 수 있습니다.
        // 예: queryClient.setQueryData(['aiAnswer', createdQuestion.id], aiResponse);
      } catch (error) {
        // AI 답변 생성 실패가 전체적인 성공 흐름을 방해하지 않도록 console.error로 처리
        console.error("AI 생성 중 오류:", error);
      }

      setDialog({
        open: true,
        title: "질문 등록 완료",
        message: "질문이 성공적으로 등록되었습니다.",
      });

      resetForm();
      navigate(`/questions/${createdQuestion.id}`);
    },
    onError: (error) => {
      console.error("Error submitting question:", error);
      setDialog({
        open: true,
        title: "오류 발생",
        message: "질문 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo?.id) return;

    submitQuestion({
      title,
      content,
      tags,
      userId: userInfo.id,
    });
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setPreviewMode(false);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    previewMode,
    setPreviewMode,
    isSubmitting,
    handleTagsChange,
    handleSubmit,
    resetForm,
    dialog,
    setDialog,
  };
};
