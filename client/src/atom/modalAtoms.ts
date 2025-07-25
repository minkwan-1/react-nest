import { atom } from "jotai";

interface ErrorModalState {
  isOpen: boolean;
  info: string;
  navigateTo?: string;
}

export const errorModalAtom = atom<ErrorModalState>({
  isOpen: false,
  info: "",
  navigateTo: undefined,
});

export const authRedirectModalAtom = atom(false);
