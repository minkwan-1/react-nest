import { Box, Typography } from "@mui/material";
import { AILoadingCard, AIErrorAlert, AnswerLoadingOrEmpty } from "./index";

const themeColors = {
  primary: "#b8dae1",
  primaryLight: "#f0f7f8",
  primaryDark: "#9cc7d0",
  background: "#FFFFFF",
  surface: "#f8fbfc",
  borderLight: "#e1f2f5",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E",
  downvote: "#EF4444",
  tag: {
    bg: "#e8f5f7",
    text: "#7ba8b3",
  },
  accepted: "#059669",
  code: {
    bg: "#f0f7f8",
    border: "#d1e9ec",
    text: "#374151",
  },
  ai: {
    primary: "#85c1cc",
    light: "#f2f8f9",
    border: "#b8dae1",
  },
  user: {
    primary: "#a8d1db",
    light: "#f4f9fa",
    border: "#c5e2e8",
  },
};

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
  aiError,
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
          color: themeColors.textPrimary,
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
      {aiError && <AIErrorAlert aiError={aiError} />}

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
