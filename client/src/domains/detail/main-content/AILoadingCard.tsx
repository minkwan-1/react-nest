import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";

const baseThemeColors = {
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

const AILoadingCard = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const themeColors = {
    ...baseThemeColors,
    ai: {
      ...baseThemeColors.ai,
      light: isDarkMode ? "#1e293b" : baseThemeColors.ai.light,
      border: isDarkMode ? "#334155" : baseThemeColors.ai.border,
    },
    textSecondary: isDarkMode ? "#94A3B8" : baseThemeColors.textSecondary,
  };

  return (
    <Card
      sx={{
        mb: 4,
        border: `2px solid ${themeColors.ai.border}`,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 20px rgba(255, 255, 255, 0.08)"
          : "0 4px 20px rgba(133, 193, 204, 0.2)",
        backgroundColor: themeColors.ai.light,
        animation: "pulse 2s infinite",
        "@keyframes pulse": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.8 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress
          size={32}
          sx={{ color: themeColors.ai.primary, mb: 2 }}
        />
        <Typography
          variant="h6"
          sx={{
            color: themeColors.ai.primary,
            fontWeight: 700,
            mb: 1,
          }}
        >
          🤖 AI가 답변을 생성하고 있습니다...
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: themeColors.textSecondary,
            fontSize: "14px",
          }}
        >
          질문을 분석하고 최적의 답변을 준비 중입니다
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AILoadingCard;
