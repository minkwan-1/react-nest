import { signupUserInfo } from "@atom/auth";
import { useAtom } from "jotai";
import { useSignupMutate } from "@domains/auth/api/useAuthHooks";

export const useHandleSignup = () => {
  const [userInfo] = useAtom(signupUserInfo);
  const { mutateAsync: signupAsyncMutate } = useSignupMutate();

  console.log(userInfo);
  const handleCompleteSignup = async () => {
    if (!userInfo) throw new Error("유저 정보가 없습니다.");
    if (!userInfo.phoneNumber)
      throw new Error("전화번호 인증이 완료되지 않았습니다.");

    try {
      const newCompleteUserInfo = {
        ...userInfo,
        isExist: true,
      };

      const result = await signupAsyncMutate(newCompleteUserInfo);
      if (!result.success) {
        throw new Error(result.message || "회원가입 중 오류가 발생했습니다.");
      }

      localStorage.removeItem("userInfo");

      return result;
    } catch (error) {
      console.error("회원가입 처리 중 오류:", error);
      throw error;
    }
  };

  return handleCompleteSignup;
};
