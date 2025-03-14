import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch user information from the backend
  const fetchUserInfo = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        // Set the token in the axios headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch the user data
        const response = await axios.get<UserInfo>(
          "http://localhost:3000/auth/me"
        );
        setUser(response.data);

        // Set the nickname if it exists in the response
        if (response.data.name) {
          setNickname(response.data.name);
          localStorage.setItem("nickname", response.data.name);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        // If the token is invalid, clear the authentication data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    } else {
      // Try to fetch the nickname from the URL or local storage
      const storedNickname =
        new URLSearchParams(window.location.search).get("nickname") ||
        localStorage.getItem("nickname");

      if (storedNickname) {
        setNickname(storedNickname);
        localStorage.setItem("nickname", storedNickname);
      }

      setIsLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    clearAuthData();
    navigate("/");
  };

  // Clear authentication data
  const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("nickname");
    setUser(null);
    setNickname("");

    // Remove the token from axios headers
    if (axios.defaults.headers.common["Authorization"]) {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Load user information when the component mounts
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return {
    user,
    nickname,
    isLoading,
    isLoggedIn: !!user,
    logout,
    clearAuthData,
    setUser,
    setNickname,
  };
};

export default useAuth;
