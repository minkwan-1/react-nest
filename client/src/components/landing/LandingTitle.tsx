import { Typography, useTheme } from "@mui/material";

const LandingTitle = () => {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: "600",
          fontSize: { xs: "50px", sm: "30px", md: "40px", lg: "50px" },
          lineHeight: 1.2,
          mb: 4,
          ...theme.applyStyles("light", { color: "#333" }),
          ...theme.applyStyles("dark", { color: "#f0f0f0" }),
        }}
      >
        문제의 답을 찾는 여정,
        <br />
        Pullim과 함께 시작하세요.
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontWeight: "400",
          fontSize: { xs: "8px", sm: "15px", md: "20px", lg: "25px" },
          mb: 5,
          maxWidth: "650px",
          ...theme.applyStyles("light", { color: "#555" }),
          ...theme.applyStyles("dark", { color: "#c0c0c0" }),
        }}
      >
        프로그래밍의 모든 궁금증을 풀림에서 함께 해결해 드립니다.
        <br />
        문제를 해결하고, 지식을 넓히세요.
      </Typography>
    </>
  );
};

export default LandingTitle;
