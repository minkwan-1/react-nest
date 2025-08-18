import { realUserInfo } from "@atom/auth";
import {
  Typography,
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  alpha,
  useTheme,
} from "@mui/material";
import { useAtom } from "jotai";
import ReactQuill from "react-quill";
import LoginIcon from "@mui/icons-material/Login";
import SendIcon from "@mui/icons-material/Send";
import { editorModule } from "../module/editorModule";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";

const baseThemeColors = {
  primary: "#b8dae1",
  primaryDark: "#9cc7d0",
  light: {
    surface: "#f8fbfc",
    textPrimary: "#1E293B",
    textSecondary: "#64748B",
  },
  dark: {
    surface: "#2d3748",
    textPrimary: "#f7fafc",
    textSecondary: "#a0aec0",
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
  const [realUser] = useAtom(realUserInfo);

  const mainColor = baseThemeColors.primary;

  if (!realUser) {
    return (
      <Paper
        sx={{
          p: { xs: 3, sm: 5 },
          mt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          backgroundColor: alpha(baseThemeColors.primary, 0.1),
          border: `1px solid ${alpha(baseThemeColors.primary, 0.3)}`,
          borderRadius: "12px",
        }}
      >
        <LoginIcon
          sx={{ fontSize: 48, color: baseThemeColors.primaryDark, mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          답변 작성은 로그인 후에 가능합니다
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          지식을 공유하고 싶다면 먼저 로그인해주세요!
        </Typography>
        <Button
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => {
            window.location.href = "/start";
          }}
          sx={{
            bgcolor: baseThemeColors.primary,
            color: baseThemeColors.dark.surface,
            fontWeight: 700,
            borderRadius: "8px",
            px: 3,
            py: 1.5,
            textTransform: "none",
            "&:hover": {
              bgcolor: baseThemeColors.primaryDark,
              boxShadow: `0 4px 12px ${alpha(baseThemeColors.primary, 0.3)}`,
            },
          }}
        >
          로그인하러 가기
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        ✍️ 답변 작성
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Box
        sx={{
          mb: 2.5,
          ".ql-toolbar": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottom: "none",
            ...theme.applyStyles("light", {
              backgroundColor: "#fff",
              border: `1px solid ${alpha("#000", 0.1)}`,
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: alpha("#fff", 0.03),
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }),
          },
          ".ql-container": {
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            minHeight: "200px",
            ...theme.applyStyles("light", {
              backgroundColor: "#fff",
              border: `1px solid ${alpha("#000", 0.1)}`,
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: alpha("#fff", 0.03),
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }),
          },
          ".ql-editor": {
            minHeight: "200px",
            maxHeight: "400px",
            overflow: "auto",
            "&.ql-blank::before": {
              fontStyle: "normal",
              ...theme.applyStyles("light", {
                color: alpha("#000", 0.4),
              }),
              ...theme.applyStyles("dark", {
                color: alpha("#fff", 0.4),
              }),
            },
          },
          ".ql-active": {
            color: `${mainColor} !important`,
            ".ql-stroke": { stroke: `${mainColor} !important` },
          },
        }}
      >
        <ReactQuill
          value={userAnswer}
          onChange={setUserAnswer}
          modules={editorModule}
          theme="snow"
          readOnly={isSubmittingAnswer}
          placeholder="답변을 입력해주세요..."
        />
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmittingAnswer || !userAnswer.trim()}
          onClick={handleSubmitAnswer}
          endIcon={!isSubmittingAnswer && <SendIcon />}
          sx={{
            position: "relative",
            background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
            color: "white",
            textTransform: "none",
            fontWeight: 700,
            padding: "10px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            transition: "all 0.3s ease",
            boxShadow: `0 4px 12px ${alpha(mainColor, 0.3)}`,
            "&:hover": {
              background: `linear-gradient(135deg, ${mainColor} 20%, #ccaee3 100%)`,
              boxShadow: `0 6px 20px ${alpha(mainColor, 0.5)}`,
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: `0 2px 8px ${alpha(mainColor, 0.3)}`,
            },
            "&.Mui-disabled": {
              background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
              opacity: 0.7,
              color: "white",
            },
          }}
        >
          {isSubmittingAnswer ? (
            <>
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-12px",
                }}
              />
              <span style={{ visibility: "hidden" }}>📝 답변 등록</span>
            </>
          ) : (
            "📝 답변 등록"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AnswerEditor;
