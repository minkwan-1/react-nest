import React from "react";
import { Box, TextField, Typography } from "@mui/material";

interface TitleFieldProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleField: React.FC<TitleFieldProps> = ({ title, setTitle }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1.5,
          fontWeight: 600,

          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "inline-block",
            width: "4px",
            height: "16px",
            borderRadius: "2px",
            marginRight: "10px",
            background: "linear-gradient(to bottom, #b8dae1, #ccaee3)",
          },
        }}
      >
        제목
      </Typography>

      <TextField
        label="질문의 제목을 입력하세요"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",

            "& fieldset": {
              transition: "border-color 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "#b8dae1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#b8dae1",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#b8dae1",
            },
          },
          "& .MuiInputBase-input": {
            padding: "14px 16px",
          },
        }}
      />
    </Box>
  );
};

export default TitleField;
