import { API_URL } from "@api/axiosConfig";

export const fetchMyInfoAPI = async (userId: string) => {
  // 개발용 인위적 지연 (1.5초)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const res = await fetch(`${API_URL}my-info?id=${userId}`);

  if (!res.ok) {
    throw new Error("프로필 정보 불러오기 실패");
  }

  const data = await res.json();

  return data?.myInfo;
};
