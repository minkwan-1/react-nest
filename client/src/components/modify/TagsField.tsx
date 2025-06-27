import { TextField, alpha, useTheme } from "@mui/material";

interface TagsFieldProps {
  tags: string[];
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TagsField = ({ tags, handleTagsChange }: TagsFieldProps) => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";
  return (
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
  );
};

export default TagsField;
