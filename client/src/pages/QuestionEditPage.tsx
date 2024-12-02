import React, { Suspense, lazy, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  TextField,
  useTheme,
  Chip,
} from "@mui/material";

import { PageContainer, ComponentWrapper } from "../components/layout/common";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

export default function QuestionEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/questions", {
        title,
        content,
        tags,
      });

      console.log("Question submitted:", response.data);
      alert("Question submitted successfully!");

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit the question.");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
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
                      theme.palette.mode === "dark" ? "#333" : "#fff",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  }}
                />
              </Suspense>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Tags</Typography>
              <TextField
                label="Tags (comma separated)"
                fullWidth
                value={tags.join(", ")}
                onChange={handleTagsChange}
                helperText="Enter tags separated by commas"
              />

              <Box mt={1}>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} sx={{ margin: "0 4px" }} />
                ))}
              </Box>
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
