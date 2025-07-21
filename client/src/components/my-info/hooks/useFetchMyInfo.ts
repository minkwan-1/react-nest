import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchMyInfoAPI } from "../api/fetchMyInfoAPI";

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

const useFetchMyInfo = (
  userId: string | undefined
): UseQueryResult<MyInfoType | null> => {
  return useQuery<MyInfoType | null>({
    queryKey: ["myInfo", userId],
    queryFn: () => fetchMyInfoAPI(userId!),
    enabled: !!userId,
  });
};

export default useFetchMyInfo;
