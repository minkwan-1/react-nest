import axios from "axios";
import { axiosInstance } from "@api/axiosConfig";

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
    const response = await axiosInstance.post(
      `auth/${provider}/user`,
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
        endpoint = `auth/google/user/update`;
        break;
      case "naver":
        endpoint = `auth/naver/user/update`;
        break;

        break;
      default:
        throw new Error("지원하지 않는 소셜 로그인 제공자입니다.");
    }

    const response = await axiosInstance.post(endpoint, userInfo);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Signup error:", error);
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

// export const signin = async (userInfo: SignupUserInfo) => {
//   try {
//     const response = await axiosInstance.post(
//       `auth/${userInfo.provider}/user`,
//       {
//         code,
//         provider,
//       },
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       throw new Error(
//         error.response.data.message || "로그인 중 오류가 발생했습니다."
//       );
//     }
//     throw new Error("서버와 통신 중 오류가 발생했습니다.");
//   }
// };
