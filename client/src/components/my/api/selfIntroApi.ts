import { API_URL } from "@api/axiosConfig";

// 한 줄 소개 조회 API
export const fetchSelfIntro = async (userId: string) => {
  const res = await fetch(`${API_URL}self-intro?id=${userId}`);

  if (!res.ok) {
    throw new Error("소개 불러오기 실패");
  }

  return res.json();
};

// 한 줄 소개 수정 API
export const updateSelfIntro = async ({
  userId,
  selfIntro,
}: {
  userId: string;
  selfIntro: string;
}) => {
  const res = await fetch(`${API_URL}self-intro`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId, selfIntro }),
  });

  if (!res.ok) {
    throw new Error("소개 저장 실패");
  }
  return res.json();
};
