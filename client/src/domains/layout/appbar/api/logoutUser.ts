import { axiosInstance } from "@api/axiosConfig";

export const logoutUser = async () => {
  const response = await axiosInstance.get("auth/logout");

  return response.data;
};
