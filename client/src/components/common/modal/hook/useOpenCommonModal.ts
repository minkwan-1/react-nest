import { useAtom } from "jotai";
import { commonModalAtom, ModalType } from "@atom/modalAtoms";

interface OpenModalOptions {
  isOpen: boolean;
  type: ModalType;
  title: string;
  info: string;
  navigateTo?: string;
}

export const useOpenCommonModal = () => {
  const [, setModal] = useAtom(commonModalAtom);

  const openModal = ({
    isOpen,
    type,
    title,
    info,
    navigateTo,
  }: OpenModalOptions) => {
    setModal({
      isOpen,
      type,
      title,
      info,
      navigateTo,
    });
  };

  return { openModal };
};
