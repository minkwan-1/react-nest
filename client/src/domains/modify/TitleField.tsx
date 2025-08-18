import { TextField } from "@mui/material";

interface TitleFieldProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleField = ({ title, setTitle }: TitleFieldProps) => {
  const mainColor = "#b8dae1";

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

          "& fieldset": {
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
