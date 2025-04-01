import { Box, Button, alpha } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SubmitButton = () => {
  // const theme = useTheme();
  // const isDarkMode = theme.palette.mode === "dark";
  const mainColor = "#03cb84";

  return (
    <Box>
      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        sx={{
          background: `linear-gradient(135deg, ${mainColor} 0%, #02b279 100%)`,
          color: "white",
          textTransform: "none",
          fontWeight: 700,
          padding: "10px 24px",
          borderRadius: "10px",
          fontSize: "15px",
          transition: "all 0.3s ease",
          boxShadow: `0 4px 12px ${alpha(mainColor, 0.3)}`,
          "&:hover": {
            background: `linear-gradient(135deg, ${mainColor} 20%, #02b279 100%)`,
            boxShadow: `0 6px 20px ${alpha(mainColor, 0.5)}`,
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: `0 2px 8px ${alpha(mainColor, 0.3)}`,
          },
        }}
      >
        질문 등록하기
      </Button>
    </Box>
  );
};

export default SubmitButton;
