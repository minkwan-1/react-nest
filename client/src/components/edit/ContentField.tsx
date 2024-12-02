import { Box, Typography, useTheme } from "@mui/material";
import { Suspense, lazy } from "react";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

interface ContentFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  previewMode: boolean;
}

const ContentField = ({
  content,
  setContent,
  previewMode,
}: ContentFieldProps) => {
  const theme = useTheme();
  return (
    <Box mb={2}>
      <Typography variant="h6">Content</Typography>
      <Suspense fallback={<div>Loading editor...</div>}>
        <MDEditor
          value={content}
          onChange={(value = "") => setContent(value)}
          preview={previewMode ? "preview" : "edit"}
          height={300}
          style={{
            backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          }}
        />
      </Suspense>
    </Box>
  );
};

export default ContentField;
