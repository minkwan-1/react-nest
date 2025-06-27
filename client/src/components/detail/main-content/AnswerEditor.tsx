import {
  Typography,
  Alert,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import ReactQuill from "react-quill";

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

type AnswerEditorProps = {
  submitError: string | null;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  isSubmittingAnswer: boolean;
  handleSubmitAnswer: () => void;
};

const AnswerEditor = ({
  submitError,
  userAnswer,
  setUserAnswer,
  isSubmittingAnswer,
  handleSubmitAnswer,
}: AnswerEditorProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const themeColors = {
    ...baseThemeColors,
    background: isDarkMode ? "#1E293B" : baseThemeColors.background,
    surface: isDarkMode ? "#334155" : baseThemeColors.surface,
    textPrimary: isDarkMode ? "#F8FAFC" : baseThemeColors.textPrimary,
    textSecondary: isDarkMode ? "#94A3B8" : baseThemeColors.textSecondary,
    code: {
      ...baseThemeColors.code,
      bg: isDarkMode ? "#1E293B" : baseThemeColors.code.bg,
      border: isDarkMode ? "#475569" : baseThemeColors.code.border,
      text: isDarkMode ? "#E2E8F0" : baseThemeColors.code.text,
    },
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: themeColors.textPrimary,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        ✍️ 답변 작성
      </Typography>

      {submitError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(239, 68, 68, 0.15)",
          }}
        >
          {submitError}
        </Alert>
      )}

      <Card
        sx={{
          border: `2px solid ${themeColors.primary}`,
          borderRadius: 3,
          boxShadow: isDarkMode
            ? "0 4px 20px rgba(255, 255, 255, 0.1)"
            : "0 4px 20px rgba(184, 218, 225, 0.2)",
          mb: 3,
          backgroundColor: themeColors.surface,
          "&:hover": {
            boxShadow: isDarkMode
              ? "0 6px 25px rgba(255, 255, 255, 0.15)"
              : "0 6px 25px rgba(184, 218, 225, 0.3)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <ReactQuill
            value={userAnswer}
            onChange={setUserAnswer}
            modules={quillModules}
            theme="snow"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#fff",
              color: isDarkMode ? "#f1f5f9" : "inherit",
              borderRadius: 8,
              opacity: isSubmittingAnswer ? 0.6 : 1,
              minHeight: "200px",
            }}
            readOnly={isSubmittingAnswer}
          />
        </CardContent>
      </Card>

      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: themeColors.primary,
            color: "white",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontSize: "16px",
            boxShadow: isDarkMode
              ? "0 4px 15px rgba(255,255,255,0.1)"
              : "0 4px 15px rgba(184, 218, 225, 0.4)",
            "&:hover": {
              bgcolor: themeColors.primaryDark,
              boxShadow: isDarkMode
                ? "0 6px 20px rgba(255,255,255,0.15)"
                : "0 6px 20px rgba(184, 218, 225, 0.5)",
              transform: "translateY(-2px)",
            },
            "&:disabled": {
              bgcolor: "#e0e0e0",
              boxShadow: "none",
            },
            transition: "all 0.3s ease",
          }}
          onClick={handleSubmitAnswer}
          disabled={isSubmittingAnswer || !userAnswer.trim()}
        >
          {isSubmittingAnswer ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
              등록 중...
            </>
          ) : (
            <>📝 답변 등록</>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AnswerEditor;
