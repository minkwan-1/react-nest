import React, { useMemo, Suspense } from "react";
import {
  Box,
  Typography,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import DOMPurify from "dompurify";
import QuillEditor from "./QuillEditor";

interface ContentFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentField: React.FC<ContentFieldProps> = ({ content, setContent }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const mainColor = "#03cb84";

  const Quill_Editor = useMemo(
    () => <QuillEditor value={content} onChange={setContent} />,
    [content, setContent]
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1.5,
          fontWeight: 600,
          color: isDarkMode ? "#fff" : "#333",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "inline-block",
            width: "4px",
            height: "16px",
            borderRadius: "2px",
            marginRight: "10px",
            background: `linear-gradient(to bottom, ${mainColor}, #02b279)`,
          },
        }}
      >
        질문 내용
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: isDarkMode ? alpha("#fff", 0.6) : alpha("#000", 0.6),
          fontSize: "14px",
        }}
      >
        문제 상황, 시도한 방법, 예상 결과 등을 상세히 설명해주세요
      </Typography>

      {/* Editor style wrapper */}
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
          {Quill_Editor}
        </Suspense>
      </Box>

      {/* Preview Section - Only visible when there's content */}
      {content && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: "12px",
            backgroundColor: isDarkMode
              ? alpha("#fff", 0.03)
              : alpha("#f9f9f9", 0.7),
            border: `1px solid ${
              isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
            }`,
            transition: "all 0.2s ease",
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: mainColor,
              mb: 2,
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '""',
                display: "inline-block",
                width: "3px",
                height: "14px",
                borderRadius: "2px",
                marginRight: "8px",
                background: `linear-gradient(to bottom, ${mainColor}, #02b279)`,
              },
            }}
          >
            미리보기
          </Typography>
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
            style={{
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              maxHeight: "300px",
              overflowY: "auto",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: isDarkMode
                ? alpha("#fff", 0.01)
                : alpha("#fff", 0.5),
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ContentField;
