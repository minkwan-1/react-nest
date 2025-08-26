import axios from "axios";
import { axiosInstance } from "@api/axiosConfig";

export const requestVerificationCodeAPI = async (phoneNumber: string) => {
  try {
    const response = await axiosInstance.post("/api/send-code", {
      toPhoneNumber: `+82${phoneNumber.trim()}`,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || `서버 에러: ${error.response.status}`;
      throw new Error(errorMessage);
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
