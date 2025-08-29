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

  const { data: myInfo, isPending: isInfoLoading } = useFetchMyInfo(userId);

  const [nickname, setNickname] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (myInfo) {
      setNickname(myInfo.nickname || "");
      setInterests(myInfo.interests || []);
      setSocialLinks(myInfo.socialLinks?.length ? myInfo.socialLinks : [""]);
      setProfileImageUrl(myInfo.profileImageUrl || "");
    }
  }, [myInfo]);

  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (uploadedUrl) => {
      setProfileImageUrl(uploadedUrl);
    },
    onError: (error) => {
      console.error("프로필 이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    },
  });

  const { mutate: saveForm, isPending: isSaving } = useMutation({
    mutationFn: saveMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo", userId] });

      navigate("/my");
    },
    onError: (error) => {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleDeleteInterest = (interestToDelete: string) => {
    setInterests(interests.filter((i) => i !== interestToDelete));
  };

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

  const handleProfileImageUpload = (base64Image: string) => {
    uploadImage(base64Image);
  };

  const handleSave = () => {
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
