import { axiosInstance } from "@api/axiosConfig";
import { imageService } from "@domains/edit/service/imageService";

interface SaveMyInfoPayload {
  userId: string;
  nickname: string;
  interests: string[];
  socialLinks: string[];
  profileImageUrl: string;
}

export const saveMyInfo = async (payload: SaveMyInfoPayload) => {
  try {
    const response = await axiosInstance.post("my-info", payload);

    return response.data;
  } catch (error) {
    console.error("정보 저장 실패:", error);
    throw new Error("정보 저장에 실패했습니다.");
  }
};

export const uploadProfileImage = async (base64Image: string) => {
  const file = await imageService.convertBase64ToWebPFileWithFallback(
    base64Image
  );
  const uploadedUrl = await imageService.uploadFileToS3(file);
  return uploadedUrl;
};
