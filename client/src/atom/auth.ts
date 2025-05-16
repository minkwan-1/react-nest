import { atom } from "jotai";

export interface signupUserInfo {
  email: string;
  name: string;
  provider: string;
}

export const signupUserInfo = atom<signupUserInfo | null>(null);

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
  provider: string;
}

export const realUserInfo = atom<realUserInfo | null>(null);
