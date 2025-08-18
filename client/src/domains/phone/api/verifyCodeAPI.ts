import { API_URL } from "@api/axiosConfig";

interface VerifyCodeParams {
  phoneNumber: string;
  verificationCode: string;
}

export const verifyCode = async ({
  phoneNumber,
  verificationCode,
}: VerifyCodeParams) => {
  const response = await fetch(`${API_URL}api/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      verificationCode,
      phoneNumber: `+82${phoneNumber}`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `서버 에러: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message || "인증 코드가 올바르지 않습니다.");
  }

  return data;
};
