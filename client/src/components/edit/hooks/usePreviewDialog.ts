import { useState } from "react";

export const usePreviewDialog = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const handlePreviewOpen = () => setIsPreviewOpen(true);
  const handlePreviewClose = () => setIsPreviewOpen(false);

  return {
    isPreviewOpen,
    setIsPreviewOpen,
    handlePreviewOpen,
    handlePreviewClose,
  };
};
