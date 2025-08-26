import { useMutation } from "@tanstack/react-query";
import { streamAiAnswer, StreamAiAnswerProps } from "./ai-api";

export const useStreamAiAnswerMutate = () =>
  useMutation<void, Error, StreamAiAnswerProps>({
    mutationFn: streamAiAnswer,
  });
