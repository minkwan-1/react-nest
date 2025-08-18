import React, { useMemo, Suspense } from "react";
import {
  Box,
  Typography,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import QuillEditor from "./QuillEditor";

interface ContentFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentField: React.FC<ContentFieldProps> = ({ content, setContent }) => {
  const theme = useTheme();
  const mainColor = "#b8dae1";

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
          display: "flex",
          alignItems: "center",
          ...theme.applyStyles("light", {
            color: "#333",
          }),
          ...theme.applyStyles("dark", {
            color: "#ffffff",
          }),
          "&::before": {
            content: '""',
            display: "inline-block",
            width: "4px",
            height: "16px",
            borderRadius: "2px",
            marginRight: "10px",
            background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
          },
        }}
      >
        질문 내용
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontSize: "14px",
          ...theme.applyStyles("light", {
            color: alpha("#000", 0.6),
          }),
          ...theme.applyStyles("dark", {
            color: alpha("#fff", 0.6),
          }),
        }}
      >
        문제 상황, 시도한 방법, 예상 결과 등을 상세히 설명해주세요
      </Typography>

      <Box
        sx={{
          ".ql-toolbar": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            ...theme.applyStyles("light", {
              backgroundColor: "#f5f5f5",
              border: `1px solid ${alpha("#000", 0.1)}`,
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: alpha("#fff", 0.05),
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }),
            borderBottom: "none",
          },
          ".ql-container": {
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            maxHeight: "400px",
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
          },
          ".ql-picker": {
            ...theme.applyStyles("light", {
              color: "#444",
            }),
            ...theme.applyStyles("dark", {
              color: "#ddd",
            }),
          },
          ".ql-picker-options": {
            ...theme.applyStyles("light", {
              backgroundColor: "#fff",
              border: `1px solid ${alpha("#000", 0.1)}`,
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "#333",
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }),
          },
          ".ql-stroke": {
            ...theme.applyStyles("light", {
              stroke: "#444",
            }),
            ...theme.applyStyles("dark", {
              stroke: "#ddd",
            }),
          },
          ".ql-fill": {
            ...theme.applyStyles("light", {
              fill: "#444",
            }),
            ...theme.applyStyles("dark", {
              fill: "#ddd",
            }),
          },
          ".ql-picker-label": {
            ...theme.applyStyles("light", {
              color: "#444",
            }),
            ...theme.applyStyles("dark", {
              color: "#ddd",
            }),
          },
          ".ql-picker-item": {
            ...theme.applyStyles("light", {
              color: "#444",
            }),
            ...theme.applyStyles("dark", {
              color: "#ddd",
            }),
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
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            ...theme.applyStyles("light", {
              backgroundColor: "#fff",
              color: "#333",
              border: `1px solid ${alpha("#000", 0.1)}`,
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "#333",
              color: "#fff",
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }),
          },
          ".ql-tooltip input[type=text]": {
            borderRadius: "4px",
            padding: "4px 8px",
            ...theme.applyStyles("light", {
              backgroundColor: "#f5f5f5",
              color: "#333",
              border: `1px solid ${alpha("#000", 0.1)}`,
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "#444",
              color: "#fff",
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }),
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
                borderRadius: "8px",
                ...theme.applyStyles("light", {
                  backgroundColor: "#fff",
                  border: `1px solid ${alpha("#000", 0.1)}`,
                }),
                ...theme.applyStyles("dark", {
                  backgroundColor: alpha("#fff", 0.03),
                  border: `1px solid ${alpha("#fff", 0.1)}`,
                }),
              }}
            >
              <CircularProgress size={40} sx={{ color: mainColor }} />
              <Typography
                sx={{
                  ml: 2,
                  ...theme.applyStyles("light", {
                    color: alpha("#000", 0.6),
                  }),
                  ...theme.applyStyles("dark", {
                    color: alpha("#fff", 0.7),
                  }),
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
    </Box>
  );
};

export default ContentField;
