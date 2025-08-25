import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { useFetchMyInfo } from "./useFetchMyInfo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveMyInfo, uploadProfileImage } from "../api/saveMyInfoAPI";
import { snackbarAtom } from "@atom/snackbarAtom";

const useMyInfoForm = () => {
  const [userInfo] = useAtom(realUserInfo);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const userId = userInfo?.user.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log("gdgdgdgdgdgdgdgd", userInfo);
  // 1. 프로필 정보 조회(useQuery)
  const { data: myInfo, isPending: isInfoLoading } = useFetchMyInfo(userId);

  // 폼 상태 정의
  const [nickname, setNickname] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // 2. useQuery의 데이터로 폼 상태 초기화
  useEffect(() => {
    if (myInfo) {
      setNickname(myInfo.nickname || "");
      setInterests(myInfo.interests || []);
      setSocialLinks(myInfo.socialLinks?.length ? myInfo.socialLinks : [""]);
      setProfileImageUrl(myInfo.profileImageUrl || "");
    }
  }, [myInfo]);

  // 3. 이미지 업로드용 useMutation
  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (uploadedUrl) => {
      setProfileImageUrl(uploadedUrl);
      console.log("S3 업로드 URL:", uploadedUrl);
    },
    onError: (error) => {
      console.error("프로필 이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    },
  });

  // 4. 정보 저장용 useMutation
  const { mutate: saveForm, isPending: isSaving } = useMutation({
    mutationFn: saveMyInfo,
    onSuccess: () => {
      // ✅ 정보 저장 성공 시, myInfo 쿼리를 무효화하여 최신 정보로 갱신
      queryClient.invalidateQueries({ queryKey: ["myInfo", userId] });
      // alert(myInfo ? "정보가 수정되었습니다." : "정보가 저장되었습니다.");
      navigate("/my");
    },
    onError: (error) => {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  // 핸들러들
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

  // 프로필 이미지 Base64 업로드 및 처리 핸들러
  const handleProfileImageUpload = (base64Image: string) => {
    uploadImage(base64Image);
  };

  // 저장 핸들러
  const handleSave = () => {
    console.log("클릭됨");
    if (!userId) return;
    const payload = {
      userId,
      nickname: nickname.trim(),
      interests,
      socialLinks: socialLinks.filter((link) => link.trim() !== ""),
      profileImageUrl,
    };
    saveForm(payload);
    setSnackbar({
      isOpen: true,
      type: "info",
      message: "정보가 성공적으로 수정되었어요.",
    });
  };

  return {
    nickname,
    setNickname,
    interests,
    interestInput,
    setInterestInput,
    socialLinks,
    profileImageUrl,
    setProfileImageUrl,

    isLoading: isInfoLoading,
    isUploading,
    isSaving,
    myInfo,

    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleProfileImageUpload,
    handleSave,
  };
};

export default useMyInfoForm;
