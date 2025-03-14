import { Box } from "@mui/material";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useColorScheme } from "@mui/material/styles";

interface GoogleLoginButtonProps {
  googleImage: string;
  showGoogleLogin: boolean;
  onGoogleClick: () => void;
  onGoogleSuccess: (credentialResponse: CredentialResponse) => void;
  onGoogleError: () => void;
}

function GoogleLoginButton({
  googleImage,
  showGoogleLogin,
  onGoogleClick,
  onGoogleSuccess,
  onGoogleError,
}: GoogleLoginButtonProps) {
  const { mode } = useColorScheme();

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Box sx={{ position: "relative" }}>
        {/* Google login button image */}
        <img
          src={googleImage}
          alt="Google 로그인"
          style={{ width: "32px", height: "32px", cursor: "pointer" }}
          onClick={onGoogleClick}
        />

        {/* Google login popup */}
        {showGoogleLogin && (
          <Box
            sx={{
              position: "absolute",
              top: "40px",
              right: "0",
              background: mode === "dark" ? "grey.800" : "white",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => onGoogleError()}
              useOneTap
            />
          </Box>
        )}
      </Box>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
