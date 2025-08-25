import { Box, Typography } from "@mui/material";
import { AILoadingCard, AnswerLoadingOrEmpty } from "./index";

type Answer = {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isAiAnswer?: boolean;
};

type AnswerListProps = {
  aiAnswer: Answer | null;
  aiLoading: boolean;
  aiError: string | null;
  answersLoading: boolean;
  answersError: string | null;
  answers: Answer[];
  renderAnswers: () => React.ReactNode;
};

const AnswerList = ({
  aiAnswer,
  aiLoading,
  answersLoading,
  answersError,
  answers,
  renderAnswers,
}: AnswerListProps) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        💬 답변 목록 ({(aiAnswer ? 1 : 0) + answers.length})
      </Typography>

      {/* AILoadingCard */}
      {aiLoading && <AILoadingCard />}

      {/* AIErrorAlert */}
      {/* {aiError && <AIErrorAlert aiError={aiError} />} */}

      {/* AnswerLoadingOrEmpty */}
      <AnswerLoadingOrEmpty
        answersLoading={answersLoading}
        answersError={answersError}
        aiAnswerExists={!!aiAnswer}
        userAnswersCount={answers.length}
        aiLoading={aiLoading}
      />

      {!answersLoading && !answersError && (aiAnswer || answers.length > 0) && (
        <Box sx={{ mb: 4 }}>{renderAnswers()}</Box>
      )}
    </Box>
  );
};

export default AnswerList;
