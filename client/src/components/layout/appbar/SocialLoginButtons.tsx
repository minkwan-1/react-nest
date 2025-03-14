import { Box } from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import ThemeToggleButton from "./ThemeToggleButton";
import { SocialPlatform } from "./hooks/useSocialLogin";
import {
  GoogleLoginButton,
  KakaoLoginButton,
  NaverLoginButton,
} from "./socialLoginButtons/index";

interface SocialLoginButtonsProps {
  googleImage: string;
  kakaoImage: string;
  naverImage: string;
  showGoogleLogin: boolean;
  onOAuthLogin: (provider: SocialPlatform) => void;
  onGoogleSuccess: (credentialResponse: CredentialResponse) => void;
  onGoogleError: () => void;
}

function SocialLoginButtons({
  googleImage,
  kakaoImage,
  naverImage,
  showGoogleLogin,
  onOAuthLogin,
  onGoogleSuccess,
  onGoogleError,
}: SocialLoginButtonsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        position: "relative",
      }}
    >
      {/* Theme Toggle Button */}
      <ThemeToggleButton />

      {/* Google Login Button */}
      <GoogleLoginButton
        googleImage={googleImage}
        showGoogleLogin={showGoogleLogin}
        onGoogleClick={() => onOAuthLogin("google")}
        onGoogleSuccess={onGoogleSuccess}
        onGoogleError={onGoogleError}
      />

      {/* Kakao Login Button */}
      <KakaoLoginButton
        kakaoImage={kakaoImage}
        onKakaoClick={() => onOAuthLogin("kakao")}
      />

      {/* Naver Login Button */}
      <NaverLoginButton
        naverImage={naverImage}
        onNaverClick={() => onOAuthLogin("naver")}
      />
    </Box>
  );
}

export default SocialLoginButtons;
