import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export interface SignupUserInfo {
  email: string;
  name: string;
  phoneNumber: string;
  provider: string;
}

export const postAuthorizationCode = async ({
  code,
  provider,
}: {
  code: string;
  provider: string;
}) => {
  console.log("#프론트엔드->백엔드 인가 코드: ", code);
  try {
    const response = await axios.post(
      `${API_URL}auth/${provider}/user`,
      {
        code,
        provider,
      },
      {
        withCredentials: true,
      }
    );
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

export const signup = async (userInfo: SignupUserInfo) => {
  try {
    console.log("최종 회원가입 시 userInfo: ", userInfo);

    let endpoint = "";
    switch (userInfo.provider) {
      case "google":
        endpoint = `${API_URL}auth/google/user/update`;
        break;
      case "naver":
        endpoint = `${API_URL}auth/naver/user/update`;
        break;

        break;
      default:
        throw new Error("지원하지 않는 소셜 로그인 제공자입니다.");
    }

    const response = await axios.post(endpoint, userInfo);
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
