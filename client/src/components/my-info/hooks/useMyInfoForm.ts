import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { realUserInfo } from "@atom/auth";
import useFetchMyInfo from "./useFetchMyInfo";

const useMyInfoForm = () => {
  // 유저 전역 상태
  const [userInfo] = useAtom(realUserInfo);
  const userId = userInfo?.id;

  // 프로필 정보 가져오기 훅 적용
  const myInfo = useFetchMyInfo(userInfo?.id);

  // 기존 폼 상태 정의
  const [job, setJob] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 프로필 이미지 관련 상태 추가
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 사용자 ID가 있을 때 로딩 상태 설정
  useEffect(() => {
    if (userId) {
      setIsLoading(true);
    }
  }, [userId]);

  // 서버에서 받아온 myInfo 데이터로 폼 필드 초기화
  useEffect(() => {
    if (userId && myInfo !== null && !isInitialized) {
      console.log("서버에서 받아온 프로필 정보: ", myInfo);

      setJob(myInfo?.job || "");
      setInterests(myInfo?.interests || []);
      setSocialLinks(myInfo?.socialLinks?.length ? myInfo.socialLinks : [""]);

      // 프로필 이미지 URL이 있으면 미리보기 설정
      if (myInfo?.profileImageUrl) {
        setPreviewUrl(myInfo.profileImageUrl);
      }

      setIsInitialized(true);
      setIsLoading(false);
    } else if (userId && myInfo === null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [myInfo, isInitialized, userId]);

  // 관심 분야 관련 핸들러들
  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleDeleteInterest = (interestToDelete: string) => {
    setInterests(interests.filter((i) => i !== interestToDelete));
  };

  // 소셜 링크 관련 핸들러들
  const handleSocialLinkChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const handleRemoveSocialLink = (index: number) => {
    if (socialLinks.length > 1) {
      const updated = socialLinks.filter((_, i) => i !== index);
      setSocialLinks(updated);
    }
  };

  // 프로필 이미지 관련 핸들러들
  const handleCameraClick = () => {
    console.log("아이콘 클릭 시 파일 input 열기");
    fileInputRef?.current?.click();
  };

  // WebP 변환 함수
  const convertToWebPFile = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        // 이미지 크기 최적화 (예: 최대 800px)
        const maxSize = 800;
        let { width, height } = img;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          resolve(file); // WebP 변환 실패 시 원본 반환
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File([blob], `profile-${Date.now()}.webp`, {
                type: "image/webp",
              });
              resolve(webpFile);
            } else {
              resolve(file); // WebP 변환 실패 시 원본 반환
            }
          },
          "image/webp",
          0.8 // 품질 80%
        );
      };

      img.onerror = () => resolve(file); // 이미지 로드 실패 시 원본 반환
      img.src = URL.createObjectURL(file);
    });
  };

  // 프로필 이미지 업로드 API 호출 (임시로 주석 처리)
  const uploadProfileImage = async (file: File): Promise<string | null> => {
    try {
      // TODO: 백엔드 구현 후 활성화
      /*
      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("userId", userInfo?.id || "");

      const response = await axios.post(
        "http://localhost:3000/profile/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.imageUrl;
      */

      // 임시로 미리보기 URL 반환
      console.log("업로드할 파일:", file);
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    // 이미지 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 검증 (예: 5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setIsUploading(true);

    try {
      console.log("원본 파일:", file.name, file.type, file.size);

      // WebP로 변환
      const webpFile = await convertToWebPFile(file);
      console.log("변환된 파일:", webpFile.name, webpFile.type, webpFile.size);

      setSelectedImage(webpFile);

      // 백엔드에 업로드 (임시로 미리보기만 설정)
      const uploadedUrl = await uploadProfileImage(webpFile);

      if (uploadedUrl) {
        console.log("업로드 성공:", uploadedUrl);
        setPreviewUrl(uploadedUrl);
      }
    } catch (error) {
      console.error("이미지 처리 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");

      // 실패 시 상태 초기화
      setSelectedImage(null);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  // 저장 핸들러 (프로필 이미지 정보 포함)
  const handleSave = async () => {
    if (!userId) return;

    const filteredSocialLinks = socialLinks.filter(
      (link) => link.trim() !== ""
    );

    try {
      const payload = {
        userId,
        job: job.trim(),
        interests,
        socialLinks: filteredSocialLinks,
        // 프로필 이미지 URL 포함 (백엔드 구현 시 활성화)
        // profileImageUrl: previewUrl || myInfo?.profileImageUrl || null,
      };

      console.log("저장할 데이터: ", payload);

      await axios.post("http://localhost:3000/my-info", payload);
      alert(myInfo ? "정보가 수정되었습니다." : "정보가 저장되었습니다.");
    } catch (err) {
      console.log("저장 실패: ", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return {
    // 기존 상태값들
    job,
    setJob,
    interests,
    interestInput,
    setInterestInput,
    socialLinks,
    isLoading,
    myInfo,

    // 프로필 이미지 관련 상태값들
    fileInputRef,
    selectedImage,
    previewUrl,
    isUploading,

    // 기존 핸들러들
    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleSave,

    // 프로필 이미지 관련 핸들러들
    handleCameraClick,
    handleFileChange,
  };
};

export default useMyInfoForm;
