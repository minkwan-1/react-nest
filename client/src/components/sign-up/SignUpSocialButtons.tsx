import { Box, Button, Typography, Divider, useTheme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { NaverIcon } from "./SocialIcons";

const handleOAuthLogin = (provider: string): void => {
  if (!provider) {
    console.error("로그인 제공자가 지정되지 않았습니다.");
    return;
  }

  try {
    console.log("회원가입 버튼 클릭 확인 콘솔");
    console.log("회원가입 처리 프로바이더 확인용 콘솔:", provider);
    window.location.href = `http://localhost:3000/auth/${provider}/login`;
  } catch (error) {
    console.error(`${provider} 로그인 중 오류가 발생했습니다:`, error);
  }
};

const SignUpSocialButtons = (): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      {/* 가입 안내 title */}
      <Typography
        sx={{
          mb: 1,
          fontWeight: "bold",
          fontSize: { xs: "1.6em", sm: "2rem" },
          ...theme.applyStyles("light", {
            color: "text.primary",
          }),
          ...theme.applyStyles("dark", {
            color: "#f5f5f5",
          }),
        }}
      >
        소셜 계정으로 Pullim 가입하기
      </Typography>
      {/* 가입 안내 desc */}
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          fontWeight: 300,
          ...theme.applyStyles("light", {
            color: "text.secondary",
          }),
          ...theme.applyStyles("dark", {
            color: "#b0b0b0",
          }),
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
          transition: "all 0.2s",
          textTransform: "none",
          ...theme.applyStyles("light", {
            borderColor: "#00000015",
            color: "#444",
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            "&:hover": {
              borderColor: "#00000030",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            },
          }),
          ...theme.applyStyles("dark", {
            borderColor: "#ffffff25",
            color: "#f0f0f0",
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
            "&:hover": {
              borderColor: "#ffffff40",
              boxShadow: "0 4px 8px rgba(255,255,255,0.08)",
            },
          }),
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
          fontWeight: 500,
          textTransform: "none",
          transition: "all 0.2s",
          ...theme.applyStyles("light", {
            boxShadow: "0 2px 8px rgba(3,199,90,0.3)",
            "&:hover": {
              bgcolor: "#02b350",
              boxShadow: "0 4px 10px rgba(3,199,90,0.4)",
            },
          }),
          ...theme.applyStyles("dark", {
            color: "white",
            boxShadow: "0 2px 8px rgba(3,199,90,0.2)",
            "&:hover": {
              bgcolor: "#02b350",
              boxShadow: "0 4px 10px rgba(3,199,90,0.3)",
            },
          }),
        }}
        onClick={() => handleOAuthLogin("naver")}
      >
        네이버로 가입하기
      </Button>

      {/* Kakao Button */}
      {/* <Button
        variant="contained"
        startIcon={<KakaoIcon />}
        sx={{
          mb: 2,
          py: 1.2,
          borderRadius: 50,
          bgcolor: "#FEE500",
          color: "#3A1D1D",
          fontWeight: 500,
          textTransform: "none",
          transition: "all 0.2s",
          ...theme.applyStyles("light", {
            boxShadow: "0 2px 8px rgba(254,229,0,0.3)",
            "&:hover": {
              bgcolor: "#efd600",
              boxShadow: "0 4px 10px rgba(254,229,0,0.4)",
            },
          }),
          ...theme.applyStyles("dark", {
            boxShadow: "0 2px 8px rgba(254,229,0,0.2)",
            "&:hover": {
              bgcolor: "#efd600",
              boxShadow: "0 4px 10px rgba(254,229,0,0.3)",
            },
          }),
        }}
        onClick={() => handleOAuthLogin("kakao")}
      >
        카카오로 가입하기
      </Button> */}

      {/* Divider */}
      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <Divider
          sx={{
            flex: 1,
            ...theme.applyStyles("light", {
              borderColor: "#00000008",
            }),
            ...theme.applyStyles("dark", {
              borderColor: "#ffffff15",
            }),
          }}
        />
        <Typography
          variant="body2"
          sx={{
            px: 2,
            fontWeight: 300,
            ...theme.applyStyles("light", {
              color: "text.secondary",
            }),
            ...theme.applyStyles("dark", {
              color: "#b0b0b0",
            }),
          }}
        >
          또는
        </Typography>
        <Divider
          sx={{
            flex: 1,
            ...theme.applyStyles("light", {
              borderColor: "#00000008",
            }),
            ...theme.applyStyles("dark", {
              borderColor: "#ffffff15",
            }),
          }}
        />
      </Box>
    </>
  );
};

export default SignUpSocialButtons;
