import axios from "axios";
import { axiosInstance } from "@api/axiosConfig";

interface VerifyCodeParams {
  phoneNumber: string;
  verificationCode: string;
}

export const verifyCode = async ({
  phoneNumber,
  verificationCode,
}: VerifyCodeParams) => {
  try {
    const response = await axiosInstance.post("/api/verify-code", {
      verificationCode,
      phoneNumber: `+82${phoneNumber}`,
    });

    const data = response.data;

    if (data.status !== "success") {
      throw new Error(data.message || "인증 코드가 올바르지 않습니다.");
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      throw new Error(
        errorData.message || `서버 에러: ${error.response.status}`
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
