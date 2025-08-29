import React from "react";
import { Box, Card, CircularProgress, Typography, Alert } from "@mui/material";

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

interface Props {
  answersLoading: boolean;
  answersError: string | null;
  aiAnswerExists: boolean;
  userAnswersCount: number;
  aiLoading: boolean;
}

const AnswerLoadingOrEmpty: React.FC<Props> = ({
  answersLoading,
  answersError,
  aiAnswerExists,
  userAnswersCount,
  aiLoading,
}) => {
  if (answersLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 6,
          backgroundColor: themeColors.surface,
          borderRadius: 3,
          border: `2px solid ${themeColors.borderLight}`,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            size={32}
            sx={{ color: themeColors.primary, mb: 2 }}
          />
          <Typography
            variant="body1"
            sx={{ color: themeColors.textSecondary, fontWeight: 600 }}
          >
            답변을 불러오는 중...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (answersError) {
    return (
      <Alert
        severity="error"
        sx={{
          mb: 4,
          borderRadius: 3,
          border: "2px solid #ef4444",
          boxShadow: "0 4px 15px rgba(239, 68, 68, 0.2)",
          "& .MuiAlert-message": {
            fontSize: "15px",
            fontWeight: 600,
          },
        }}
      >
        사용자 답변 로딩 실패: {answersError}
      </Alert>
    );
  }

  if (!aiAnswerExists && userAnswersCount === 0 && !aiLoading) {
    return (
      <Card
        sx={{
          textAlign: "center",
          py: 6,
          px: 4,
          bgcolor: themeColors.surface,
          borderRadius: 3,
          border: `2px dashed ${themeColors.primary}`,
          boxShadow: "0 4px 15px rgba(184, 218, 225, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: themeColors.textSecondary,
            mb: 2,
            fontWeight: 600,
          }}
        >
          💭 아직 답변이 없습니다
        </Typography>
        <Typography variant="body1" sx={{ color: themeColors.textSecondary }}>
          첫 번째 답변을 작성해서 토론을 시작해보세요!
        </Typography>
      </Card>
    );
  }

  return null;
};

export default AnswerLoadingOrEmpty;
