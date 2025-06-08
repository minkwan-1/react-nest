import { handleCompleteSignupWithAPI } from "@api/auth/auth";
import { signupUserInfo } from "@atom/auth";
import { useAtom } from "jotai";

export const useHandleSignup = () => {
  const [userInfo] = useAtom(signupUserInfo);

  const handleCompleteSignup = async () => {
    if (!userInfo) throw new Error("유저 정보가 없습니다.");
    if (!userInfo.phoneNumber)
      throw new Error("전화번호 인증이 완료되지 않았습니다.");

    try {
      const newCompleteUserInfo = {
        ...userInfo,
        isExist: true,
      };

      const result = await handleCompleteSignupWithAPI(newCompleteUserInfo);
      if (!result.success) {
        throw new Error(result.message || "회원가입 중 오류가 발생했습니다.");
      }

      localStorage.removeItem("userInfo");

      return;
    } catch (error) {
      console.error("회원가입 처리 중 오류:", error);
      throw error;
    }
  };

  return handleCompleteSignup;
};
