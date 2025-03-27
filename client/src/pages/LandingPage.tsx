import { Box, Typography, Button } from "@mui/material";
import AppbarLogo from "@components/layout/appbar/AppbarLogo";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 헤더 영역 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: 2,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "#f8f8f8",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <AppbarLogo />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 3 },
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "14px",
                display: { xs: "none", sm: "block" },
                color: "#333",
                border: "1px solid #e0e0e0",
                borderRadius: "50px",
                padding: "8px 20px",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                  borderColor: "#bdbdbd",
                },
              }}
              onClick={() => navigate("/sign-in")}
            >
              로그인
            </Button>
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "14px",
                display: { xs: "none", sm: "block" },
                color: "#333",
                border: "1px solid #e0e0e0",
                borderRadius: "50px",
                padding: "8px 20px",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                  borderColor: "#bdbdbd",
                },
              }}
              onClick={() => navigate("/sign-up")}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 메인 콘텐츠 영역 */}
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 80px)",
          bgcolor: "#f8f8f8",
          position: "relative",
        }}
      >
        {/* 왼쪽 텍스트 영역 */}
        <Box
          sx={{
            width: { xs: "100%", sm: "60%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pl: { xs: 4, sm: 10 },
            pr: 4,
            py: { xs: 4, sm: 8 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "600",
              fontSize: { xs: "16px", sm: "30px", md: "40px", lg: "50px" },
              lineHeight: 1.2,
              mb: 4,
              color: "#333",
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
              color: "#555",
              maxWidth: "650px",
            }}
          >
            프로그래밍의 모든 궁금증을 풀림에서 함께 해결해 드립니다.
            <br />
            문제를 해결하고, 지식을 넓히세요.
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00796b",
                color: "#fff",
                textTransform: "none",
                borderRadius: "30px",
                px: { xs: 3, md: 5 },
                py: 1.5,
                fontSize: { xs: "16px", md: "20px" },
                "&:hover": {
                  bgcolor: "#004d40",
                },
              }}
              onClick={() => navigate("/home")}
            >
              시작하기
            </Button>
          </Box>
        </Box>

        {/* 오른쪽 이미지 영역 - xs에서는 숨김 */}
        <Box
          sx={{
            width: "40%",
            position: "relative",
            overflow: "hidden",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 녹색 사각형 배경 (터미널 느낌) - 가운데 위치 */}
          <Box
            sx={{
              position: "relative",
              width: "80%",
              height: "60%",
              bgcolor: "#00796b",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* 코드 에디터 느낌 */}
            <Box
              sx={{
                width: "80%",
                height: "80%",
                bgcolor: "#1e1e1e",
                borderRadius: "6px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {Array.from({ length: 15 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: `${Math.random() * 50 + 40}%`,
                    height: "8px",
                    bgcolor:
                      index % 3 === 0
                        ? "#FFD700"
                        : index % 3 === 1
                        ? "#9370DB"
                        : "#4FC3F7",
                    opacity: 0.7,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
