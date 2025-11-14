import axios from "axios";
import { axiosInstance } from "@api/axiosConfig";

export interface SignupUserInfo {
  email: string;
  name: string;
  phoneNumber: string;
  provider: string;
}

type AuthorizationPayload = {
  code: string;
  provider: string;
  state?: string;
};

export const postAuthorizationCode = async ({
  code,
  provider,
  state,
}: {
  code: string;
  provider: string;
  state: string | null;
}) => {
  console.log("점검 로그: ", { code, provider });
  try {
    const payload: AuthorizationPayload = {
      code,
      provider,
    };

    if (provider === "naver" && state) {
      payload.state = state;
    }

    const response = await axiosInstance.post(
      `auth/${provider}/user`,
      payload,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "인가 코드 처리 중 오류가 발생했습니다."
      );
    }
    throw new Error("서버와 통신 중 오류가 발생했습니다.");
  }
};

export const signup = async (userInfo: SignupUserInfo) => {
  try {
    let endpoint = "";
    switch (userInfo.provider) {
      case "google":
        endpoint = `auth/google/user/update`;
        break;
      case "naver":
        endpoint = `auth/naver/user/update`;
        break;
      default:
        throw new Error("지원하지 않는 소셜 로그인 제공자입니다.");
    }

    const response = await axiosInstance.post(endpoint, userInfo);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
    };
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("auth/me");
    return response.data;
  } catch (error) {
    throw new Error(`사용자 정보를 가져오는 데 실패했습니다: ${error}`);
  }
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};
