import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
  alpha,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CodeIcon from "@mui/icons-material/Code";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

const NaverIcon = () => (
  <Box
    sx={{
      width: 22,
      height: 22,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#03C75A",
      color: "white",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(3, 199, 90, 0.3)",
    }}
  >
    N
  </Box>
);

const KakaoIcon = () => (
  <Box
    sx={{
      width: 22,
      height: 22,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#FEE500",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(254, 229, 0, 0.3)",
    }}
  >
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path
        fill="#000000"
        d="M12,2C6.477,2,2,5.477,2,9.667c0,2.913,1.89,5.471,4.737,6.929l-1.21,4.477c-0.102,0.379,0.357,0.711,0.688,0.498l5.478-3.762C11.797,17.934,11.899,18,12,18c5.523,0,10-3.477,10-8.333C22,5.477,17.523,2,12,2z"
      />
    </svg>
  </Box>
);

const SignInPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: isMediumScreen || isSmallScreen ? "100%" : "50%",
          height: "100vh",
          p: { xs: 3, sm: 4, md: 5 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 0,
          bgcolor: "white",
          backgroundImage: "linear-gradient(135deg, #ffffff 0%, #f9fafc 100%)",
          boxShadow: isSmallScreen ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          sx={{
            mb: 1,
            fontWeight: "bold",
            fontSize: { xs: "1.6em", sm: "2rem" },
          }}
        >
          소설 계정으로 Pullim 로그인하기
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontWeight: 300,
          }}
        >
          소셜 계정으로 빠르게 로그인하고 질문을 시작하세요
        </Typography>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            mb: 2,
            py: 1.2,
            borderRadius: 50,
            borderColor: alpha("#000", 0.15),
            color: "#444",
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
            textTransform: "none",
            "&:hover": {
              borderColor: alpha("#000", 0.25),
              bgcolor: alpha("#000", 0.02),
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            },
          }}
        >
          구글로 로그인
        </Button>

        <Button
          variant="contained"
          startIcon={<NaverIcon />}
          sx={{
            mb: 2,
            py: 1.2,
            borderRadius: 50,
            bgcolor: "#03C75A",
            color: "white",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(3,199,90,0.3)",
            transition: "all 0.2s",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#02B44E",
              boxShadow: "0 4px 12px rgba(3,199,90,0.4)",
            },
          }}
        >
          네이버로 로그인
        </Button>

        <Button
          variant="contained"
          startIcon={<KakaoIcon />}
          sx={{
            mb: 2,
            py: 1.2,
            borderRadius: 50,
            bgcolor: "#FEE500",
            color: "#3A1D1D",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(254,229,0,0.3)",
            transition: "all 0.2s",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#FFDC00",
              boxShadow: "0 4px 12px rgba(254,229,0,0.4)",
            },
          }}
        >
          카카오로 로그인
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Divider sx={{ flex: 1, borderColor: alpha("#000", 0.08) }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, fontWeight: 300 }}
          >
            또는
          </Typography>
          <Divider sx={{ flex: 1, borderColor: alpha("#000", 0.08) }} />
        </Box>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            label="이메일"
            variant="outlined"
            size="small"
            InputProps={{
              sx: {
                borderRadius: 50,
                bgcolor: alpha("#f7f9fc", 0.8),
                overflow: "hidden",
                "& fieldset": {
                  borderColor: alpha("#000", 0.08),
                },
                "&:hover fieldset": {
                  borderColor: alpha("#000", 0.15) + "!important",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "1px",
                  boxShadow: `0 0 0 4px ${alpha("#6366F1", 0.08)}`,
                },
              },
            }}
            InputLabelProps={{
              sx: { ml: 1 },
            }}
            sx={{
              "& label.Mui-focused": {
                color: "#6366F1",
              },
            }}
          />

          <TextField
            fullWidth
            label="비밀번호"
            variant="outlined"
            size="small"
            InputProps={{
              sx: {
                borderRadius: 50,
                bgcolor: alpha("#f7f9fc", 0.8),
                overflow: "hidden",
                "& fieldset": {
                  borderColor: alpha("#000", 0.08),
                },
                "&:hover fieldset": {
                  borderColor: alpha("#000", 0.15) + "!important",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "1px",
                  boxShadow: `0 0 0 4px ${alpha("#6366F1", 0.08)}`,
                },
              },
            }}
            InputLabelProps={{
              sx: { ml: 1 },
            }}
            sx={{
              "& label.Mui-focused": {
                color: "#6366F1",
              },
            }}
          />

          <Typography
            variant="body2"
            align="right"
            sx={{
              mt: -1,
              color: "#6366F1",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            비밀번호를 잊으셨나요?
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.2,
              borderRadius: 50,
              bgcolor: "#6366F1",
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              transition: "all 0.2s",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#4F46E5",
                boxShadow: "0 6px 20px rgba(99,102,241,0.6)",
              },
            }}
          >
            로그인
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: alpha("#000", 0.6), fontWeight: 300 }}
          >
            아직 계정이 없으신가요?{" "}
            <Box
              onClick={() => navigate("/sign-up")}
              component="span"
              sx={{ color: "#6366F1", fontWeight: 500, cursor: "pointer" }}
            >
              회원가입
            </Box>
          </Typography>
        </Box>
      </Paper>

      {!isSmallScreen && !isMediumScreen && (
        <Box
          sx={{
            width: isMediumScreen ? "40%" : "50%",
            background: "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 배경 패턴 */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* 메인 컨텐츠 */}
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 5,
                mx: "auto",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <LockOpenIcon sx={{ fontSize: 50, color: "white" }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 4,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              다시 오신 것을 환영합니다!
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 7,
                maxWidth: "80%",
                mx: "auto",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              프로그래밍 커뮤니티와 함께 성장하세요. 전문가의 답변으로 코딩의
              모든 난관을 해결할 수 있습니다.
            </Typography>

            {/* 특징 목록 */}
            <Box sx={{ textAlign: "left", mb: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <HelpOutlineIcon sx={{ color: "white" }} />
                </Box>
                <Box>
                  <Typography sx={{ color: "white", fontWeight: 500 }}>
                    질문하고 답변받기
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    원하는 질문을 하고 빠르게 답변을 받으세요
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <CodeIcon sx={{ color: "white" }} />
                </Box>
                <Box>
                  <Typography sx={{ color: "white", fontWeight: 500 }}>
                    코드 리뷰 & 공유
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    코드를 공유하고 전문가의 피드백을 받으세요
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <ChatIcon sx={{ color: "white" }} />
                </Box>
                <Box>
                  <Typography sx={{ color: "white", fontWeight: 500 }}>
                    커뮤니티와 교류
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    다른 개발자들과 지식과 경험을 공유하세요
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 장식용 원 */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.03)",
              top: -150,
              right: -100,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.04)",
              bottom: -100,
              left: -50,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SignInPage;
