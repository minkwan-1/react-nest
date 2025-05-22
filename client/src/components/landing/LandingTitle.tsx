import { Typography, useTheme, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingTitle = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: "600",
          fontSize: { xs: "32px", sm: "38px", md: "42px", lg: "50px" },
          lineHeight: 1.2,
          mb: { xs: 2, sm: 3, md: 4 },
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
          fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "22px" },
          mb: { xs: 3, sm: 4, md: 5 },
          maxWidth: "650px",
          ...theme.applyStyles("light", { color: "#555" }),
          ...theme.applyStyles("dark", { color: "#c0c0c0" }),
        }}
      >
        프로그래밍의 모든 궁금증을 풀림에서 함께 해결해 드립니다.
        <br />
        문제를 해결하고, 지식을 넓히세요.
      </Typography>

      {/* 새로운 버튼 섹션 추가 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          mt: { xs: 2, md: 3 },
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            py: { xs: 1.2, md: 1.5 },
            px: { xs: 3, md: 4 },
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: { xs: "14px", md: "16px" },
            textTransform: "none",
            bgcolor: "#c5a3d5",
            "&:hover": {
              bgcolor: "#02a76f",
            },
          }}
          onClick={() => navigate("/sign-up")}
        >
          시작하기
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            py: { xs: 1.2, md: 1.5 },
            px: { xs: 3, md: 4 },
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: { xs: "14px", md: "16px" },
            textTransform: "none",
            ...theme.applyStyles("light", {
              borderColor: "#c5a3d5",
              color: "#c5a3d5",
              "&:hover": {
                borderColor: "#02a76f",
                bgcolor: "rgba(3, 203, 132, 0.04)",
              },
            }),
            ...theme.applyStyles("dark", {
              borderColor: "#00ae74",
              color: "#00ae74",
              "&:hover": {
                borderColor: "#00775a",
                bgcolor: "rgba(0, 174, 116, 0.04)",
              },
            }),
          }}
          onClick={() => navigate("/home")}
        >
          더 알아보기
        </Button>
      </Box>
    </>
  );
};

export default LandingTitle;
