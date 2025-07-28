import { axiosInstance } from "@api/axiosConfig";
import axios from "axios";

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("auth/me");

    return response.data?.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};
