import { useMutation } from "@tanstack/react-query";
import { postAuthorizationCode } from "./auth";

export const usePostAuthorizationMutate = () =>
  useMutation({
    // mutationFn => {}
    mutationFn: postAuthorizationCode,
  });
