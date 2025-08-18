import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  postAuthorizationCode,
  signup,
  fetchUserInfo,
  logoutUser,
} from "./auth-api";
import { useNavigate } from "react-router-dom";

export const authQueryKeys = {
  all: "auth",
  me: () => {
    return [authQueryKeys.all, "me"];
  },
};

export const usePostAuthorizationMutate = () =>
  useMutation({
    mutationFn: postAuthorizationCode,
  });

export const useSignupMutate = () =>
  useMutation({
    mutationFn: signup,
  });

export const useFetchMeQuery = () =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchUserInfo,
    staleTime: 0,
    retry: false,
  });

export const useLogoutUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      navigate("/");
    },
    onError: (err) => {
      console.error("로그아웃 실패:", err);
    },
  });
};
