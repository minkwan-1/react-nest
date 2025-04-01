import React from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";

interface TagsFieldProps {
  tags: string[];
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TagsField = ({ tags, handleTagsChange }: TagsFieldProps) => {
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
        태그
      </Typography>

      <TextField
        label="태그 (쉼표로 구분)"
        fullWidth
        value={tags.join(", ")}
        onChange={handleTagsChange}
        helperText="태그를 쉼표(,)로 구분하여 입력하세요"
        FormHelperTextProps={{
          sx: {
            color: isDarkMode ? alpha("#fff", 0.5) : alpha("#000", 0.6),
            fontSize: "12px",
            mt: 1,
          },
        }}
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

      {tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {tags.map(
            (tag, index) =>
              tag && (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    backgroundColor: isDarkMode
                      ? alpha(mainColor, 0.15)
                      : alpha(mainColor, 0.08),
                    color: isDarkMode ? alpha("#fff", 0.9) : alpha("#000", 0.8),
                    borderRadius: "8px",
                    fontWeight: 500,
                    border: `1px solid ${
                      isDarkMode ? alpha(mainColor, 0.3) : alpha(mainColor, 0.2)
                    }`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? alpha(mainColor, 0.25)
                        : alpha(mainColor, 0.15),
                      boxShadow: `0 2px 5px ${alpha(mainColor, 0.2)}`,
                    },
                  }}
                />
              )
          )}
        </Box>
      )}
    </Box>
  );
};

export default TagsField;
