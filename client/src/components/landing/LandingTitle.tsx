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
          ...theme.applyStyles("light", { color: "#f0f0f0" }),
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
          ...theme.applyStyles("light", { color: "#c0c0c0" }),
          ...theme.applyStyles("dark", { color: "#c0c0c0" }),
        }}
      >
        프로그래밍의 모든 궁금증을 풀림에서 함께 해결해 드립니다.
        <br />
        문제를 해결하고, 지식을 넓히세요.
      </Typography>

      {/* 리퀴드 글래스 버튼 섹션 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          mt: { xs: 2, md: 3 },
        }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={{
            py: { xs: 1.2, md: 1.5 },
            px: { xs: 3, md: 4 },
            borderRadius: "16px",
            fontWeight: "600",
            fontSize: { xs: "14px", md: "16px" },
            textTransform: "none",
            position: "relative",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              transition: "left 0.5s ease",
            },
            ...theme.applyStyles("light", {
              border: "1px solid rgba(184, 218, 225, 0.4)",
              color: "#b8dae1",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(184, 218, 225, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              "&:hover": {
                background: "rgba(184, 218, 225, 0.2)",
                border: "1px solid rgba(184, 218, 225, 0.6)",
                color: "#d4e9ed",
                transform: "translateY(-2px)",
                boxShadow:
                  "0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(184, 218, 225, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                "&::before": {
                  left: "100%",
                },
              },
            }),
            ...theme.applyStyles("dark", {
              border: "1px solid rgba(184, 218, 225, 0.4)",
              color: "#b8dae1",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(184, 218, 225, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              "&:hover": {
                background: "rgba(184, 218, 225, 0.2)",
                border: "1px solid rgba(184, 218, 225, 0.6)",
                color: "#d4e9ed",
                transform: "translateY(-2px)",
                boxShadow:
                  "0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(184, 218, 225, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                "&::before": {
                  left: "100%",
                },
              },
            }),
            "&:active": {
              transform: "translateY(0px)",
            },
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
