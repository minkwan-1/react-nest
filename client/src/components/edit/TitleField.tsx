import React from "react";
import { Box, TextField, Typography, useTheme, alpha } from "@mui/material";

interface TitleFieldProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleField = ({ title, setTitle }: TitleFieldProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const mainColor = "#03cb84";

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1.5,
          fontWeight: 600,
          color: isDarkMode ? "#fff" : "#333",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "inline-block",
            width: "4px",
            height: "16px",
            borderRadius: "2px",
            marginRight: "10px",
            background: `linear-gradient(to bottom, ${mainColor}, #02b279)`,
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
            backgroundColor: isDarkMode
              ? alpha("#fff", 0.05)
              : alpha("#f5f5f5", 0.7),
            "& fieldset": {
              borderColor: isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1),
              transition: "border-color 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: mainColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: mainColor,
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: isDarkMode ? alpha("#fff", 0.7) : alpha("#000", 0.6),
            "&.Mui-focused": {
              color: mainColor,
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
