import { Button } from "@mui/material";

type GoHomeButtonProps = {
  handleGoLanding: () => void;
  mainColor: string;
  accentColor: string;
};

const GoHomeButton = ({
  handleGoLanding,
  mainColor,
  accentColor,
}: GoHomeButtonProps) => {
  return (
    <Button
      onClick={handleGoLanding}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        padding: "12px 30px",
        borderRadius: "50px",
        background: `linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%)`,
        color: "white",
        boxShadow: `0 4px 14px ${accentColor}80`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 6px 20px ${accentColor}a0`,
          transform: "translateY(-2px)",
          background: `linear-gradient(135deg, ${mainColor} 20%, ${accentColor} 100%)`,
        },
      }}
    >
      홈으로 돌아가기
    </Button>
  );
};

export default GoHomeButton;
