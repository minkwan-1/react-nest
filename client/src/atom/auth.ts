import { atom } from "jotai";
interface realUserInfo {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  provider: string;
}

export interface signupUserInfo {
  user: realUserInfo;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  provider: string;
}

export const signupUserInfo = atom<signupUserInfo | null>(null);

export const realUserInfo = atom<signupUserInfo | null>(null);
