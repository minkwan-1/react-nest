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

const SignUpPage = () => {
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
          width: isSmallScreen ? "100%" : isMediumScreen ? "60%" : "50%",
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
          소셜 계정으로 Pullim 가입하기
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontWeight: 300,
          }}
        >
          소셜 계정으로 빠르게 가입하고 질문을 시작하세요
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
          구글로 가입하기
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
          네이버로 가입하기
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
          카카오로 가입하기
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
            label="이름"
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

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1.5,
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
            가입하기
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: alpha("#000", 0.6), fontWeight: 300 }}
          >
            이미 계정이 있으신가요?{" "}
            <Box
              onClick={() => navigate("/sign-in")}
              component="span"
              sx={{ color: "#6366F1", fontWeight: 500, cursor: "pointer" }}
            >
              로그인
            </Box>
          </Typography>
        </Box>
      </Paper>

      {!isSmallScreen && (
        <Box
          sx={{
            width: isMediumScreen ? "40%" : "50%",
            bgcolor: "#F5F7FB",
            backgroundImage:
              "linear-gradient(135deg, #EFF1FA 0%, #F9FAFF 100%)",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "120%",
              height: "120%",
              top: "-10%",
              left: "-10%",
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(188,197,255,0.3) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(169,182,255,0.3) 0%, transparent 70%)",
              opacity: 0.6,
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              borderRadius: "50%",
              width: 90,
              height: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              mb: 5,
              backgroundImage:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 10px 30px rgba(118, 75, 162, 0.4)",
            }}
          >
            <CodeIcon sx={{ fontSize: 40, color: "white" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              fontWeight: 600,
              color: "#2D3748",
            }}
          >
            코딩의 모든 문제, Pullim과 함께
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              maxWidth: "80%",
              color: alpha("#2D3748", 0.8),
              lineHeight: 1.6,
            }}
          >
            안녕하세요! Pullim에 오신 것을 환영합니다. 프로그래밍과 관련된 모든
            질문에 대해 빠르고 정확한 답변을 얻으세요. 경험 많은 개발자들이
            여러분의 문제 해결을 도와드립니다.
          </Typography>

          {/* 추가 장식 요소 */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              right: "10%",
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundImage:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              opacity: 0.7,
              boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
            }}
          />

          <Box
            sx={{
              position: "absolute",

              top: "25%",
              left: "15%",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundImage:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              opacity: 0.5,
              boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: "20%",
              left: "20%",
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundImage:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              opacity: 0.6,
              boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SignUpPage;
