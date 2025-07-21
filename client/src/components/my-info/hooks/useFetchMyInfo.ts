import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@api/axiosConfig";

interface MyInfoType {
  id: string;
  userId: string;
  nickname: string;
  interests: string[];
  profileImageUrl?: string;
  socialLinks: string[];
  createdAt: string;
  updatedAt: string;
}

const useFetchMyInfo = (userId: string | undefined) => {
  const [myInfo, setMyInfo] = useState<MyInfoType | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${API_URL}my-info?id=${userId}`);
        setMyInfo(response.data?.myInfo);
      } catch (err) {
        console.error("프로필 정보 불러오기 실패: ", err);
      }
    };

    fetchMyInfo();
  }, [userId]);

  return myInfo;
};

export default useFetchMyInfo;
