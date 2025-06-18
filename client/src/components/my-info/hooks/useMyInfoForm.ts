import { useState, useEffect } from "react";
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

  // 폼 상태 정의
  const [job, setJob] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // 저장 핸들러
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
    // 상태값들
    job,
    setJob,
    interests,
    interestInput,
    setInterestInput,
    socialLinks,
    isLoading,
    myInfo,

    // 핸들러들
    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleSave,
  };
};

export default useMyInfoForm;
