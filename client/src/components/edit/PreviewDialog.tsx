import { usePreviewDialog } from "./hooks/usePreviewDialog";

const PreviewDialog = () => {
  const {
    isPreviewOpen,
    setIsPreviewOpen,
    handlePreviewOpen,
    handlePreviewClose,
  } = usePreviewDialog();

  console.log({
    isPreviewOpen,
    setIsPreviewOpen,
    handlePreviewOpen,
    handlePreviewClose,
  });
  return <div></div>;
};

export default PreviewDialog;
