import React from "react";
import { Box, Typography, TextField, Chip } from "@mui/material";

interface TagsFieldProps {
  tags: string[];
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TagsField = ({ tags, handleTagsChange }: TagsFieldProps) => {
  return (
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
  );
};

export default TagsField;
