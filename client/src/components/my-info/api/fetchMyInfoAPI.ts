import { API_URL } from "@api/axiosConfig";

export const fetchMyInfoAPI = async (userId: string) => {
  const res = await fetch(`${API_URL}my-info?id=${userId}`);

  if (!res.ok) {
    throw new Error("프로필 정보 불러오기 실패");
  }

  const data = await res.json();

  return data?.myInfo;
};
