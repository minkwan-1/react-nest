import { Box, Button, Typography, Divider, useTheme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { NaverIcon, KakaoIcon } from "./SocialIcons";

const SignInSocialButtons = () => {
  const theme = useTheme();
  return (
    <>
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
        소셜 계정으로 Pullim 로그인하기
      </Typography>
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
        소셜 계정으로 빠르게 로그인하고 질문을 시작하세요
      </Typography>

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
      >
        구글로 로그인하기
      </Button>

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
      >
        네이버로 로그인하기
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
      >
        카카오로 로그인하기
      </Button>

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
          color="text.secondary"
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

export default SignInSocialButtons;
