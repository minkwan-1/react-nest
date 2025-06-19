import { useEffect, useState } from "react";
import axios from "axios";

interface MyInfoType {
  id: string;
  userId: string;
  job: string;
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
        const response = await axios.get(
          `http://localhost:3000/my-info?id=${userId}`
        );
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
