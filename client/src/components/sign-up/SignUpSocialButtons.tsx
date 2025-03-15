import { Box, Button, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { NaverIcon, KakaoIcon } from "./SocialIcons";

const SignUpSocialButtons = () => {
  return (
    <>
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
          borderColor: "#00000015",
          color: "#444",
          fontWeight: 500,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          transition: "all 0.2s",
          textTransform: "none",
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
        }}
      >
        카카오로 가입하기
      </Button>

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
