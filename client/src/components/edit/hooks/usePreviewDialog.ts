import { useState } from "react";

export const usePreviewDialog = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDate, setPreviewDate] = useState<Date | null>(null);

  const handlePreviewOpen = () => {
    setPreviewDate(new Date());
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  return {
    isPreviewOpen,
    previewDate,
    setPreviewDate,
    handlePreviewOpen,
    handlePreviewClose,
  };
};
