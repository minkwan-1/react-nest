import { atom } from "jotai";

export interface UserInfo {
  email: string;
  name: string;
}

export const signupUserInfo = atom<UserInfo | null>(null);

export interface CompleteUserInfo {
  email: string;
  name: string;
  phoneNumber: string;
}

export const completeUserInfo = atom<CompleteUserInfo | null>(null);
