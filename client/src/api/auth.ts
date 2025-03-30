// src/api/auth.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export interface SignupUserInfo {
  email: string;
  name: string;
  phoneNumber: string;
}

export const signup = async (userInfo: SignupUserInfo) => {
  try {
    const response = await axios.post(`${API_URL}users/signup`, userInfo);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "회원가입 중 오류가 발생했습니다."
      );
    }
    throw new Error("서버와 통신 중 오류가 발생했습니다.");
  }
};

// Updated handleCompleteSignup function for PhoneVerificationPage
export const handleCompleteSignupWithAPI = async (userInfo: SignupUserInfo) => {
  try {
    const result = await signup(userInfo);
    // Save auth token if returned from backend
    // if (result.data?.token) {
    //   localStorage.setItem("token", result.data.token);
    // }
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
    };
  }
};
