import { API_URL } from "@api/axiosConfig";
import { imageService } from "@components/edit/service/imageService";

interface SaveMyInfoPayload {
  userId: string;
  nickname: string;
  interests: string[];
  socialLinks: string[];
  profileImageUrl: string;
}

export const saveMyInfo = async (payload: SaveMyInfoPayload) => {
  const res = await fetch(`${API_URL}my-info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("정보 저장에 실패했습니다.");
  }

  return res.json();
};

export const uploadProfileImage = async (base64Image: string) => {
  const file = await imageService.convertBase64ToWebPFileWithFallback(
    base64Image
  );
  const uploadedUrl = await imageService.uploadFileToS3(file);
  return uploadedUrl;
};
