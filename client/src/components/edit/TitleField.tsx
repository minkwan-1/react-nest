import React from "react";
import { Box, TextField, Typography, useTheme, alpha } from "@mui/material";

interface TitleFieldProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleField: React.FC<TitleFieldProps> = ({ title, setTitle }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1.5,
          fontWeight: 600,
          color: isDark ? "#fff" : "#000",
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
            backgroundColor: isDark
              ? alpha("#fff", 0.05)
              : alpha("#f5f5f5", 0.7),
            "& fieldset": {
              borderColor: isDark ? alpha("#fff", 0.1) : alpha("#000", 0.1),
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
            color: isDark ? alpha("#fff", 0.7) : alpha("#000", 0.6),
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
