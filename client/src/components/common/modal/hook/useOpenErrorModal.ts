import { useAtom } from "jotai";
import { errorModalAtom } from "@atom/modalAtoms";

interface OpenModalOptions {
  info: string;
  navigateTo?: string;
}

export const useOpenErrorModal = () => {
  const [, setErrorModal] = useAtom(errorModalAtom);

  const openErrorModal = ({ info, navigateTo }: OpenModalOptions) => {
    setErrorModal({
      isOpen: true,
      info,
      navigateTo,
    });
  };

  return { openErrorModal };
};
