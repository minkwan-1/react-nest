import { Card, CardContent, Divider, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AnswerCardProps } from "@domains/detail/types";
import { AnswerBadge, AnswerHeader, AnswerContent } from "./index";
import { axiosInstance } from "@api/axiosConfig";
import { useQuestionDetail } from "@domains/detail/hooks";
import { useOpenCommonModal } from "@domains/common/modal/hook/useOpenCommonModal";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

type Answer = {
  id: string;
  content: string;
  userId: string;
  isAiAnswer?: boolean;
  createdAt: string;
};

type DeleteMutationContext = {
  previousAnswers: Answer[] | undefined;
};

const AnswerCard = ({
  answer,
}: AnswerCardProps & { onDeleted?: () => void }) => {
  const { id: questionId } = useParams();
  const queryClient = useQueryClient();
  const { question } = useQuestionDetail();
  const { openModal } = useOpenCommonModal();

  const [a] = useAtom(realUserInfo);
  console.log(a);
  const buttonRenderCondition =
    question?.userId === a?.user.id && !answer.isAiAnswer;

  console.log(buttonRenderCondition);

  const deleteAnswerMutation = useMutation<
    unknown,
    Error,
    string,
    DeleteMutationContext
  >({
    mutationFn: async (answerId: string) => {
      const response = await axiosInstance.delete(`answers/delete/${answerId}`);
      return response.data;
    },
    onMutate: async (answerId: string): Promise<DeleteMutationContext> => {
      await queryClient.cancelQueries({
        queryKey: ["answers", questionId],
      });

      const previousAnswers = queryClient.getQueryData<Answer[]>([
        "answers",
        questionId,
      ]);

      queryClient.setQueryData<Answer[]>(["answers", questionId], (old) => {
        if (!old) return [];
        return old.filter((ans) => ans.id !== answerId);
      });

      return { previousAnswers };
    },
    onError: (
      err: Error,
      answerId: string,
      context?: DeleteMutationContext
    ) => {
      console.log(answerId);
      if (context?.previousAnswers) {
        queryClient.setQueryData(
          ["answers", questionId],
          context.previousAnswers
        );
      }
      console.error("답변 삭제 중 오류:", err);

      openModal({
        isOpen: true,
        type: "error",
        title: "삭제 실패",
        info: "삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["answers", questionId],
      });

      queryClient.invalidateQueries({
        queryKey: ["question", questionId],
      });

      openModal({
        isOpen: true,
        type: "success",
        title: "삭제 완료",
        info: "답변이 성공적으로 삭제되었습니다.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["answers", questionId],
      });
    },
  });

  const handleDelete = () => {
    openModal({
      isOpen: true,
      type: "info",
      title: "답변 삭제",
      info: "정말 이 답변을 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          await deleteAnswerMutation.mutateAsync(answer.id);
        } catch (error) {
          console.error("Delete mutation failed:", error);
        }
      },
    });
  };

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 6,
        border: `1px solid #D3D3D3`,
        transition: "all 0.25s ease-in-out",
        position: "relative",
        opacity: deleteAnswerMutation.isPending ? 0.6 : 1,
        pointerEvents: deleteAnswerMutation.isPending ? "none" : "auto",
      }}
    >
      <AnswerBadge isAiAnswer={answer.isAiAnswer} />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <AnswerHeader answer={answer} />
        <Divider sx={{ my: 3, borderWidth: 1 }} />
        <AnswerContent answer={answer} />
      </CardContent>

      {buttonRenderCondition && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: { xs: 2, sm: 3 },
            pt: 0,
          }}
        >
          <IconButton
            onClick={handleDelete}
            disabled={deleteAnswerMutation.isPending}
            aria-label="delete answer"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default AnswerCard;
