import { useAtom } from "jotai";
import { commonModalAtom, ModalType } from "@atom/modalAtoms";

interface OpenModalOptions {
  isOpen: boolean;
  type: ModalType;
  title: string;
  info: string;
  navigateTo?: string;
  onConfirm?: () => void;
}

export const useOpenCommonModal = () => {
  const [, setModal] = useAtom(commonModalAtom);

  const openModal = ({
    isOpen,
    type,
    title,
    info,
    navigateTo,
    onConfirm,
  }: OpenModalOptions) => {
    setModal({
      isOpen,
      type,
      title,
      info,
      navigateTo,
      onConfirm,
    });
  };

  return { openModal };
};
