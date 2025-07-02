import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

interface TagsFieldProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagsField: React.FC<TagsFieldProps> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false); // ✅ 한글 조합 중 여부
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const mainColor = "#b8dae1";

  // ✅ 조합 중이 아닐 때만 Enter로 태그 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput("");
    }
  };

  const handleDelete = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

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
            background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
          },
        }}
      >
        태그
      </Typography>

      <TextField
        label="태그 입력 후 Enter"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)} // ✅ 한글 조합 시작
        onCompositionEnd={() => setIsComposing(false)} // ✅ 한글 조합 종료
        helperText="Enter 키로 태그를 추가하세요"
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, mt: 2 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDelete(tag)}
              deleteIcon={
                <IconButton sx={{ p: 0.5 }}>
                  <Cancel
                    fontSize="small"
                    sx={{
                      color: isDarkMode ? "#ccc" : "#888",
                      "&:hover": { color: "#f44336" },
                    }}
                  />
                </IconButton>
              }
              sx={{
                backgroundColor: isDarkMode
                  ? alpha(mainColor, 0.15)
                  : alpha(mainColor, 0.08),
                color: isDarkMode ? alpha("#fff", 0.9) : alpha("#000", 0.8),
                borderRadius: "20px",
                fontWeight: 500,
                paddingX: 1,
                "& .MuiChip-label": {
                  paddingX: 1.2,
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TagsField;
