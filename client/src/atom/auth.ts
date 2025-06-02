import { atom } from "jotai";

export interface signupUserInfo {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  provider: string;
}

export const signupUserInfo = atom<signupUserInfo | null>(null);

interface realUserInfo {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  provider: string;
}

export const realUserInfo = atom<realUserInfo | null>(null);
