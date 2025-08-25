import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchMyInfoAPI } from "../api/fetchMyInfoAPI";
import { fetchMyPublicInfoAPI } from "../api/fetchMyInfoAPI";

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

export const useFetchMyInfo = (
  userId: string | undefined
): UseQueryResult<MyInfoType | null> => {
  return useQuery<MyInfoType | null>({
    queryKey: ["myInfo", userId],
    queryFn: () => fetchMyInfoAPI(userId!),
    // enabled: !!userId,
  });
};

export const useFetchMyPublicInfo = (
  userId: string | undefined
): UseQueryResult<MyInfoType | null> => {
  return useQuery<MyInfoType | null>({
    queryKey: ["myPublicInfo", userId],
    queryFn: () => fetchMyPublicInfoAPI(userId!),
    // enabled: !!userId,
  });
};
