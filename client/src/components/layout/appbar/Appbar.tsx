import { Box, Container, SxProps, Theme } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { google, naver, kakao } from "../../../images";

// Components
import AppbarLogo from "./AppbarLogo";
import UserInfo from "./UserInfo";
import SocialLoginButtons from "./SocialLoginButtons";
import ErrorDialog from "./ErrorDialog";

// Custom Hooks
import useAuth from "./hooks/useAuth";
import useSocialLogin from "./hooks/useSocialLogin";

// Interface for Appbar Props
interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const { mode } = useColorScheme();

  // Authentication states and functions
  const { user, nickname, logout, setUser, setNickname } = useAuth();

  // Social login states and functions
  const {
    showGoogleLogin,
    loginError,
    showErrorDialog,
    handleOAuthLogin,
    handleGoogleSuccess,
    handleGoogleError,
    closeErrorDialog,
  } = useSocialLogin(setUser, setNickname);

  console.log(user);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: mode === "dark" ? "grey.900" : "white",
        color: mode === "dark" ? "white" : "black",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* AppbarLogo Component */}
        <AppbarLogo />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {nickname ? (
            // UserInfo Component
            <UserInfo nickname={nickname} onLogout={logout} />
          ) : (
            // SocialLoginButtons Components
            <SocialLoginButtons
              googleImage={google}
              kakaoImage={kakao}
              naverImage={naver}
              showGoogleLogin={showGoogleLogin}
              onOAuthLogin={handleOAuthLogin}
              onGoogleSuccess={handleGoogleSuccess}
              onGoogleError={handleGoogleError}
            />
          )}
        </Box>
      </Container>

      {/* ErrorDialog Component */}
      <ErrorDialog
        open={showErrorDialog}
        message={loginError}
        onClose={closeErrorDialog}
      />
    </Box>
  );
}

export default Appbar;
