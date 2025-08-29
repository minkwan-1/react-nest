import { useEffect } from "react";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";

export const useSyncUserInfo = () => {
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  return [userInfo, setUserInfo] as const;
};
