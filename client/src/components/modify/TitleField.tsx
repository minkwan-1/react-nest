import { TextField, alpha, useTheme } from "@mui/material";

interface TitleFieldProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleField = ({ title, setTitle }: TitleFieldProps) => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <TextField
      fullWidth
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      placeholder="질문의 제목을 입력하세요"
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
        "& .MuiInputBase-input": {
          padding: "14px 16px",
        },
      }}
    />
  );
};

export default TitleField;
