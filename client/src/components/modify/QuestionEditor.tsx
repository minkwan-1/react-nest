import React, { Suspense, useRef } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { editorModule } from "@components/detail/module/editorModule";

const Font = Quill.import("formats/font");
Font.whitelist = [
  "sans-serif",
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);
Quill.register("modules/ImageResize", ImageResize);

interface QuestionEditorProps {
  content: string;
  setContent: (value: string) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  content,
  setContent,
}) => {
  const theme = useTheme();
  const quillRef = useRef<ReactQuill | null>(null);
  const mainColor = "#b8dae1";

  return (
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
          ...theme.applyStyles("light", { color: "#444" }),
          ...theme.applyStyles("dark", { color: "#ddd" }),
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
          ...theme.applyStyles("light", { stroke: "#444" }),
          ...theme.applyStyles("dark", { stroke: "#ddd" }),
        },
        ".ql-fill": {
          ...theme.applyStyles("light", { fill: "#444" }),
          ...theme.applyStyles("dark", { fill: "#ddd" }),
        },
        ".ql-picker-label": {
          ...theme.applyStyles("light", { color: "#444" }),
          ...theme.applyStyles("dark", { color: "#ddd" }),
        },
        ".ql-picker-item": {
          ...theme.applyStyles("light", { color: "#444" }),
          ...theme.applyStyles("dark", { color: "#ddd" }),
        },
        ".ql-active": {
          color: `${mainColor} !important`,
          ".ql-stroke": { stroke: `${mainColor} !important` },
          ".ql-fill": { fill: `${mainColor} !important` },
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
                ...theme.applyStyles("light", { color: alpha("#000", 0.6) }),
                ...theme.applyStyles("dark", { color: alpha("#fff", 0.7) }),
              }}
            >
              에디터 로딩 중...
            </Typography>
          </Box>
        }
      >
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={editorModule}
          theme="snow"
          placeholder="질문 내용을 자세히 작성하세요..."
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        />
      </Suspense>
    </Box>
  );
};

export default QuestionEditor;
