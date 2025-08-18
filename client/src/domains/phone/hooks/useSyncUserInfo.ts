import { useEffect } from "react";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";

export const useSyncUserInfo = () => {
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);

  // userInfo가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // 마운트 시 localStorage에서 불러와서 Atom에 설정
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  return [userInfo, setUserInfo] as const;
};
