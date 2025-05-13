import { atom } from "jotai";

export interface UserInfo {
  email: string;
  name: string;
  provider: string;
}

export const signupUserInfo = atom<UserInfo | null>(null);

export interface CompleteUserInfo {
  email: string;
  name: string;
  phoneNumber: string;
}

export const completeUserInfo = atom<CompleteUserInfo | null>(null);

interface realUserInfo {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export const realUserInfo = atom<realUserInfo | null>(null);
