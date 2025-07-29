import { atom } from "jotai";

export type SnackbarType = "success" | "error" | "info";

interface snackbarAtomState {
  isOpen: boolean;
  type: SnackbarType;
  message: string;
}

export const snackbarAtom = atom<snackbarAtomState>({
  isOpen: false,
  type: "info",
  message: "",
});
