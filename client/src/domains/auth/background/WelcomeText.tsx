import { Typography, useTheme } from "@mui/material";

const WelcomeText = () => {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          ...theme.applyStyles("light", {
            color: "#333333",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          }),
          ...theme.applyStyles("dark", {
            color: "#f0f0f0",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
          }),
        }}
      >
        Pullim에 오신 것을 환영합니다!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 7,
          maxWidth: "80%",
          mx: "auto",
          lineHeight: 1.7,
          fontWeight: 300,
          ...theme.applyStyles("light", {
            color: "#555555",
          }),
          ...theme.applyStyles("dark", {
            color: "#cccccc",
          }),
        }}
      >
        프로그래밍 커뮤니티와 함께 성장하세요. 전문가의 답변으로 코딩의 모든
        난관을 해결할 수 있습니다.
      </Typography>
    </>
  );
};

export default WelcomeText;
