import { API_URL } from "@api/axiosConfig";

export const requestVerificationCodeAPI = async (phoneNumber: string) => {
  const res = await fetch(`${API_URL}api/send-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toPhoneNumber: `+82${phoneNumber.trim()}`,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `서버 에러: ${res.status}`);
  }

  return res.json();
};
