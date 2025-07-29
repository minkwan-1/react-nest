import { atom } from "jotai";

export type ModalType = "success" | "error" | "info" | "confirm";

interface CommonModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  info: string;
  navigateTo?: string;
  onConfirm?: () => void;
}

export const commonModalAtom = atom<CommonModalState>({
  isOpen: false,
  type: "info",
  title: "",
  info: "",
  navigateTo: undefined,
  onConfirm: undefined,
});

export const authRedirectModalAtom = atom(false);
