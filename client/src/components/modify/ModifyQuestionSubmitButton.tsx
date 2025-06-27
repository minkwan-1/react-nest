import { Button, alpha, Box } from "@mui/material";

interface ModifyQuestionSubmitButtonProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

const ModifyQuestionSubmitButton = ({
  isSubmitting,
  isFormValid,
}: ModifyQuestionSubmitButtonProps) => {
  const mainColor = "#b8dae1";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mt: 4,
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || !isFormValid}
        sx={{
          position: "relative",
          background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
          color: "white",
          textTransform: "none",
          fontWeight: 700,
          padding: "10px 24px",
          borderRadius: "10px",
          fontSize: "15px",
          transition: "all 0.3s ease",
          boxShadow: `0 4px 12px ${alpha(mainColor, 0.3)}`,
          "&:hover": {
            background: `linear-gradient(135deg, ${mainColor} 20%, #ccaee3 100%)`,
            boxShadow: `0 6px 20px ${alpha(mainColor, 0.5)}`,
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: `0 2px 8px ${alpha(mainColor, 0.3)}`,
          },
          "&.Mui-disabled": {
            background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
            opacity: 0.7,
            color: "white",
          },
        }}
      >
        {isSubmitting ? "수정 중..." : "질문 수정하기"}
      </Button>
    </Box>
  );
};

export default ModifyQuestionSubmitButton;
