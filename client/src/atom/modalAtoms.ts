import { atom } from "jotai";

export type ModalType = "success" | "error" | "info";

interface CommonModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  info: string;
  navigateTo?: string;
}

export const commonModalAtom = atom<CommonModalState>({
  isOpen: false,
  type: "info",
  title: "",
  info: "",
  navigateTo: undefined,
});

export const authRedirectModalAtom = atom(false);
