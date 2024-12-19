import React, { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

import { PageContainer, ComponentWrapper } from "../components/layout/common";
import {
  TitleField,
  ContentField,
  TagsField,
  PreviewButton,
  SubmitButton,
} from "../components/edit";

export default function QuestionEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

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
            <TitleField title={title} setTitle={setTitle} />

            <ContentField content={content} setContent={setContent} />

            <TagsField tags={tags} handleTagsChange={handleTagsChange} />

            <PreviewButton
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />

            <SubmitButton />
          </form>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
}
