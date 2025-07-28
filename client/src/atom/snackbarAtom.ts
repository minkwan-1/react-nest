import { atom } from "jotai";

interface snackbarAtomState {
  isOpen: boolean;
  message: string;
}

export const snackbarAtom = atom<snackbarAtomState>({
  isOpen: false,
  message: "",
});
