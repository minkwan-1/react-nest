import { Box, Typography, Button, Stack } from "@mui/material";
// import { PageContainer } from "@components/layout/common";
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
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          borderBottom: "1px solid #F2F2F2",
          bgcolor: "#FBF9F6",
        }}
      >
        <AppbarLogo />

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button
            sx={{
              color: "#292929",
              textTransform: "none",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            About us
          </Button>
          <Button
            sx={{
              color: "#292929",
              textTransform: "none",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            Features
          </Button>
          <Button
            sx={{
              color: "#292929",
              textTransform: "none",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            Ask Question
          </Button>
          <Button
            sx={{
              color: "#292929",
              textTransform: "none",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#03cb84",
              color: "#fff",
              textTransform: "none",
              borderRadius: "24px",
              px: 3,
              "&:hover": {
                bgcolor: "#028a61",
              },
            }}
          >
            Join the community
          </Button>
        </Box>
      </Box>

      {/* 메인 콘텐츠 영역 */}
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 132px)", // 헤더와 푸터 높이 제외
          bgcolor: "#FBF9F6",
          position: "relative",
        }}
      >
        {/* 왼쪽 텍스트 영역 */}
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pl: 10,
            pr: 4,
            py: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: { xs: "20px", md: "45px", lg: "66px" },
              lineHeight: 1.1,
              mb: 4,
              color: "#242424",
            }}
          >
            Code
            <br />
            questions & answers
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "normal",
              fontSize: "24px",
              mb: 5,
              color: "#242424",
            }}
          >
            A community where developers help each other solve coding challenges
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#03cb84",
                color: "#fff",
                textTransform: "none",
                borderRadius: "24px",
                px: 4,
                py: 1.5,
                fontSize: "20px",
                "&:hover": {
                  bgcolor: "#028a61",
                },
              }}
              onClick={() => navigate("/home")}
            >
              Start exploring
            </Button>
          </Box>
        </Box>

        {/* 오른쪽 이미지 영역 */}
        <Box
          sx={{
            width: "40%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 녹색 코드 블록 */}
          <Box
            sx={{
              position: "absolute",
              top: "50px",
              right: "50px",
              width: "250px",
              height: "250px",
              bgcolor: "#03cb84",
              opacity: 0.9,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: "10px",
                bgcolor: "rgba(255,255,255,0.7)",
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: "60%",
                height: "10px",
                bgcolor: "rgba(255,255,255,0.7)",
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: "70%",
                height: "10px",
                bgcolor: "rgba(255,255,255,0.7)",
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: "40%",
                height: "10px",
                bgcolor: "rgba(255,255,255,0.7)",
              }}
            />
          </Box>

          {/* 코드 다이어그램 */}
          <Box
            sx={{
              position: "absolute",
              top: "150px",
              right: "40px",
              width: "200px",
              height: "200px",
              border: "1px solid #000",
              transform: "rotate(45deg)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: 0,
                width: "100%",
                height: "1px",
                bgcolor: "#000",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "50%",
                width: "1px",
                height: "100%",
                bgcolor: "#000",
              },
            }}
          />

          {/* 녹색 사각형 배경 (터미널 느낌) */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "80%",
              height: "50%",
              bgcolor: "#03cb84",
              borderTopLeftRadius: "8px",
            }}
          >
            {/* 코드 에디터 느낌 */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: "80%",
                height: "80%",
                bgcolor: "#292929",
                borderRadius: "4px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
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

          {/* 코드 스니펫 심볼들 */}
          {Array.from({ length: 15 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: "10px",
                color: "#000",
                fontWeight: "bold",
                opacity: 0.7,
              }}
            >
              {index % 5 === 0
                ? "{}"
                : index % 5 === 1
                ? "<>"
                : index % 5 === 2
                ? ";"
                : index % 5 === 3
                ? "()"
                : "//"}
            </Box>
          ))}
        </Box>
      </Box>

      {/* 푸터 영역 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 3,
          borderTop: "1px solid #F2F2F2",
          bgcolor: "#FBF9F6",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            color: "#757575",
            fontSize: "14px",
          }}
        >
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Help
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            FAQ
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            About
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Careers
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Blog
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            API
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Privacy
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Terms
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Contact
          </Button>
          <Button
            sx={{
              color: "#757575",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            GitHub
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default LandingPage;
