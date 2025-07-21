import { API_URL } from "@api/axiosConfig";

export const fetchUserInfo = async () => {
  const res = await fetch(`${API_URL}auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) {
      return null;
    }
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }

  const data = await res.json();
  return data?.user;
};
