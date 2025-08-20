import { Typography } from "@mui/material";

const WelcomeText = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
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
        }}
      >
        프로그래밍 커뮤니티와 함께 성장하세요. 전문가의 답변으로 코딩의 모든
        난관을 해결할 수 있습니다.
      </Typography>
    </>
  );
};

export default WelcomeText;
