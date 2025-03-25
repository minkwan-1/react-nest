import { atom } from "jotai";

export interface UserInfo {
  email: string;
  name: string;
}

export const signupUserInfo = atom<UserInfo | null>(null);
