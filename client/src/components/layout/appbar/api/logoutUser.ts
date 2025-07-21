import { API_URL } from "@api/axiosConfig";

export const logoutUser = async () => {
  const res = await fetch(`${API_URL}auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`로그아웃 실패: ${res.status}`);
  }

  return await res.json();
};
