import React, { Suspense, lazy, useState } from "react";
import { Box, Button, Typography, TextField, useTheme } from "@mui/material";

import { PageContainer, ComponentWrapper } from "../components/layout/common";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

export default function QuestionEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const theme = useTheme(); // Access the current theme

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      content,
      // tags: tags.split(",").map((tag) => tag.trim()),
    });
    alert("Question submitted successfully!");
    setTitle("");
    setContent("");
    // setTags("");
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Edit Question
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Content</Typography>
              <Suspense fallback={<div>Loading editor...</div>}>
                <MDEditor
                  value={content}
                  onChange={(value = "") => setContent(value)}
                  preview={previewMode ? "preview" : "edit"}
                  height={300}
                  style={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#333" : "#fff", // Conditional background color
                    color: theme.palette.mode === "dark" ? "#fff" : "#000", // Text color
                  }}
                />
              </Suspense>
            </Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="outlined"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? "Edit" : "Preview"}
              </Button>
            </Box>
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Submit Question
              </Button>
            </Box>
          </form>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
}
