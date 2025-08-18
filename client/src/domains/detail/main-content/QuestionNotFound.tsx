import { Box, Typography } from "@mui/material";

const QuestionNotFound = () => {
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
  return (
    <Box sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h5" sx={{ color: themeColors.textSecondary, mb: 2 }}>
        질문을 찾을 수 없습니다
      </Typography>
      <Typography variant="body1" sx={{ color: themeColors.textSecondary }}>
        요청하신 질문이 존재하지 않거나 삭제되었을 수 있습니다.
      </Typography>
    </Box>
  );
};

export default QuestionNotFound;
