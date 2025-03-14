import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { UserInfo } from "./useAuth";

export type SocialPlatform = "google" | "kakao" | "naver";

interface GoogleUserInfo {
  email: string;
  name: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

interface AuthResponse {
  accessToken: string;
  user: UserInfo;
}

export const useSocialLogin = (
  setUser: (user: UserInfo) => void,
  setNickname: (nickname: string) => void
) => {
  const [showGoogleLogin, setShowGoogleLogin] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handles social login redirect after successful login
  useEffect(() => {
    const handleSocialLoginRedirect = () => {
      // Extract required information from the URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");
      const token = urlParams.get("token");
      const socialPlatform = urlParams.get("platform");

      // If there is an error, display an error dialog
      if (error) {
        setLoginError(`An error occurred during login: ${error}`);
        setShowErrorDialog(true);
      }
      // If token and platform info exist (after successful social login)
      else if (token && socialPlatform) {
        // Fetch user data from the backend using the received token
        axios
          .get<UserInfo>("http://localhost:3000/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // Store token and user information in local storage
            localStorage.setItem("accessToken", token);
            localStorage.setItem("user", JSON.stringify(response.data));

            // Update the state
            setUser(response.data);
            setNickname(response.data.name);
            localStorage.setItem("nickname", response.data.name);

            // Remove query parameters and redirect to the home page
            navigate("/", { replace: true });
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoginError("An error occurred while fetching user information.");
            setShowErrorDialog(true);
          });
      }
    };

    handleSocialLoginRedirect();
  }, [navigate, setUser, setNickname]);

  // OAuth login handler function
  const handleOAuthLogin = (provider: SocialPlatform) => {
    if (provider === "google") {
      // Google uses a popup method for login
      setShowGoogleLogin(!showGoogleLogin);
    } else {
      // Kakao and Naver use a redirect method
      // Set up the callback URL (the URL to redirect after social login)
      const redirectUrl = `${window.location.origin}/social-callback`;
      // Redirect to the social login page
      window.location.href = `http://localhost:3000/auth/${provider}/login?redirectUrl=${encodeURIComponent(
        redirectUrl
      )}`;
    }
  };

  // Handle successful Google login
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Google did not provide authentication data");
      }

      // Decode the authentication data for debugging
      const decoded: GoogleUserInfo = jwtDecode(credentialResponse.credential);
      console.log("Google user data:", decoded);

      // Send the token to the backend for processing
      const response = await axios.post<AuthResponse>(
        "http://localhost:3000/auth/google",
        {
          token: credentialResponse.credential,
          redirectUrl: `${window.location.origin}/social-callback`,
        }
      );

      // Store the token and user data
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Update user state and nickname
      setUser(response.data.user);
      setNickname(response.data.user.name);
      localStorage.setItem("nickname", response.data.user.name);

      // Hide the Google login popup
      setShowGoogleLogin(false);
    } catch (error) {
      console.error("Google login error:", error);
      setLoginError("An error occurred during Google login.");
      setShowErrorDialog(true);
    }
  };

  // Handle Google login error
  const handleGoogleError = () => {
    console.log("Google login failed");
    setLoginError("Google login failed.");
    setShowErrorDialog(true);
  };

  // Close the error dialog
  const closeErrorDialog = () => {
    setShowErrorDialog(false);
    setLoginError("");
  };

  return {
    showGoogleLogin,
    loginError,
    showErrorDialog,
    handleOAuthLogin,
    handleGoogleSuccess,
    handleGoogleError,
    closeErrorDialog,
  };
};

export default useSocialLogin;
