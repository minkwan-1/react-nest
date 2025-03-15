import { Box, Button, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { NaverIcon, KakaoIcon } from "./SocialIcons";

const handleOAuthLogin = (provider: string): void => {
  if (provider) {
    console.log("회원가입 버튼 클릭 확인 콘솔");
    console.log("회원가입 처리 프로바이더 확인용 콘솔:", provider);
    window.location.href = `http://localhost:3000/auth/${provider}/login`;
  }
};

const SignUpSocialButtons = (): JSX.Element => {
  return (
    <>
      {/* 가입 안내 title */}
      <Typography
        sx={{
          mb: 1,
          fontWeight: "bold",
          fontSize: { xs: "1.6em", sm: "2rem" },
        }}
      >
        소셜 계정으로 Pullim 가입하기
      </Typography>
      {/* 가입 안내 desc */}
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

      {/* Google Button */}
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{
          mb: 2,
          py: 1.2,
          borderRadius: 50,
          borderColor: "#00000015",
          color: "#444",
          fontWeight: 500,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          transition: "all 0.2s",
          textTransform: "none",
        }}
        onClick={() => handleOAuthLogin("google")}
      >
        구글로 가입하기
      </Button>

      {/* Naver Button */}
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
        }}
        onClick={() => handleOAuthLogin("naver")}
      >
        네이버로 가입하기
      </Button>

      {/* Kakao Button */}
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
        }}
        onClick={() => handleOAuthLogin("kakao")}
      >
        카카오로 가입하기
      </Button>

      {/* Divider */}
      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <Divider sx={{ flex: 1, borderColor: "#00000008" }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ px: 2, fontWeight: 300 }}
        >
          또는
        </Typography>
        <Divider sx={{ flex: 1, borderColor: "#00000008" }} />
      </Box>
    </>
  );
};

export default SignUpSocialButtons;
