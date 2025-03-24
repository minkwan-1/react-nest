import { atom } from "jotai";

interface UserInfo {
  email: string;
  name: string;
}

export const signupUserInfo = atom<UserInfo | null>(null);
