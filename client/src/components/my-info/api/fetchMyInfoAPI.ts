import { axiosInstance } from "@api/axiosConfig";

export const fetchMyInfoAPI = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const response = await axiosInstance.get(
      "my-info",

      {
        params: {
          id: userId,
        },
      }
    );

    return response.data?.myInfo;
  } catch (error) {
    console.error("프로필 정보 불러오기 실패:", error);
    throw new Error("프로필 정보 불러오기 실패");
  }
};
