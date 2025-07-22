import { useMutation } from "@tanstack/react-query";
import { postAuthorizationCode, signup } from "./auth";

export const usePostAuthorizationMutate = () =>
  useMutation({
    mutationFn: postAuthorizationCode,
  });

export const useSignupMutate = () =>
  useMutation({
    mutationFn: signup,
  });

// export const useSigninMutate = () =>
//   useMutation({
//     mutationFn: signin,
//   });
