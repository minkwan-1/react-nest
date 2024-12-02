import React from "react";
import { Box, TextField } from "@mui/material";

interface TitleFieldProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleField = ({ title, setTitle }: TitleFieldProps) => {
  return (
    <Box mb={2}>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </Box>
  );
};

export default TitleField;
