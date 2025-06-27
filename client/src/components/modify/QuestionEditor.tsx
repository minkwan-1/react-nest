import {
  Box,
  CircularProgress,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Suspense } from "react";
import ReactQuill from "react-quill";

interface QuestionEditorProps {
  content: string;
  setContent: (value: string) => void;
}

const QuestionEditor = ({ content, setContent }: QuestionEditorProps) => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        ".ql-toolbar": {
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          backgroundColor: isDarkMode ? alpha("#fff", 0.05) : "#f5f5f5",
          border: `1px solid ${
            isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
          }`,
          borderBottom: "none",
        },
        ".ql-container": {
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          backgroundColor: isDarkMode ? alpha("#fff", 0.03) : "#fff",
          border: `1px solid ${
            isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
          }`,
          maxHeight: "400px",
          minHeight: "200px",
        },
        ".ql-editor": {
          minHeight: "200px",
          maxHeight: "400px",
          overflow: "auto",
        },
        ".ql-picker": {
          color: isDarkMode ? "#ddd" : "#444",
        },
        ".ql-picker-options": {
          backgroundColor: isDarkMode ? "#333" : "#fff",
          border: `1px solid ${
            isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
          }`,
        },
        ".ql-stroke": {
          stroke: isDarkMode ? "#ddd" : "#444",
        },
        ".ql-fill": {
          fill: isDarkMode ? "#ddd" : "#444",
        },
        ".ql-picker-label": {
          color: isDarkMode ? "#ddd" : "#444",
        },
        ".ql-picker-item": {
          color: isDarkMode ? "#ddd" : "#444",
        },
        ".ql-active": {
          color: `${mainColor} !important`,
          ".ql-stroke": {
            stroke: `${mainColor} !important`,
          },
          ".ql-fill": {
            fill: `${mainColor} !important`,
          },
        },
        ".ql-tooltip": {
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          border: `1px solid ${
            isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
          }`,
        },
        ".ql-tooltip input[type=text]": {
          backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
          color: isDarkMode ? "#fff" : "#333",
          border: `1px solid ${
            isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
          }`,
          borderRadius: "4px",
          padding: "4px 8px",
        },
        ".ql-tooltip a.ql-action, .ql-tooltip a.ql-remove": {
          color: mainColor,
        },
      }}
    >
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              backgroundColor: isDarkMode ? alpha("#fff", 0.03) : "#fff",
              border: `1px solid ${
                isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
              }`,
              borderRadius: "8px",
            }}
          >
            <CircularProgress size={40} sx={{ color: mainColor }} />
            <Typography
              sx={{
                ml: 2,
                color: isDarkMode ? alpha("#fff", 0.7) : alpha("#000", 0.6),
              }}
            >
              에디터 로딩 중...
            </Typography>
          </Box>
        }
      >
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          placeholder="질문 내용을 자세히 작성하세요..."
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        />
      </Suspense>
    </Box>
  );
};

export default QuestionEditor;
