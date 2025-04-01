import { Box, Button, useTheme, alpha } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PreviewButtonProps {
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  previewMode: boolean;
}

const PreviewButton = ({ previewMode, setPreviewMode }: PreviewButtonProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const mainColor = "#03cb84";

  return (
    <Box display="flex" justifyContent="flex-start">
      <Button
        variant="outlined"
        onClick={() => setPreviewMode(!previewMode)}
        startIcon={previewMode ? <VisibilityOffIcon /> : <VisibilityIcon />}
        sx={{
          border: `1px solid ${alpha(mainColor, 0.5)}`,
          color: mainColor,
          backgroundColor: isDarkMode
            ? alpha("#fff", 0.05)
            : alpha(mainColor, 0.05),
          borderRadius: "10px",
          padding: "8px 16px",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: isDarkMode
              ? alpha(mainColor, 0.15)
              : alpha(mainColor, 0.1),
            borderColor: mainColor,
            boxShadow: `0 2px 8px ${alpha(mainColor, 0.2)}`,
          },
        }}
      >
        {previewMode ? "편집 모드" : "미리보기"}
      </Button>
    </Box>
  );
};

export default PreviewButton;
