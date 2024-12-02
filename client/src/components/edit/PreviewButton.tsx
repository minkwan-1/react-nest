import { Box, Button } from "@mui/material";

interface PreviewButtonProps {
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  previewMode: boolean;
}

const PreviewButton = ({ previewMode, setPreviewMode }: PreviewButtonProps) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Button variant="outlined" onClick={() => setPreviewMode(!previewMode)}>
        {previewMode ? "Edit" : "Preview"}
      </Button>
    </Box>
  );
};

export default PreviewButton;
