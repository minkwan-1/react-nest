import { Typography, alpha, useTheme } from "@mui/material";

const ContentInstruction = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Typography
      variant="body2"
      sx={{
        mb: 2,
        color: isDarkMode ? alpha("#fff", 0.6) : alpha("#000", 0.6),
        fontSize: "14px",
      }}
    >
      문제 상황, 시도한 방법, 예상 결과 등을 상세히 설명해주세요
    </Typography>
  );
};

export default ContentInstruction;
