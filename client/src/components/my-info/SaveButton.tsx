import { Grow, Box, Button, useTheme } from "@mui/material";

const darkKeyColor = "#2a4a4f";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

// MyInfo 타입 정의
interface MyInfoType {
  id: string;
  userId: string;
  job: string;
  interests: string[];
  socialLinks: string[];
  createdAt: string;
  updatedAt: string;
}

// Props 타입 정의
interface SaveButtonProps {
  handleSave: () => Promise<void>; // Promise<void>로 수정
  myInfo: MyInfoType | null;
}

const SaveButton = ({ handleSave, myInfo }: SaveButtonProps) => {
  const theme = useTheme();

  return (
    <Grow in timeout={1800}>
      <Box textAlign="center" mb={5}>
        <Button
          onClick={handleSave}
          variant="contained"
          size="large"
          sx={{
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${darkKeyColor} 0%, #1a3b40 100%)`
                : gradientBg,
            color: "white",
            fontWeight: "600",
            fontSize: "1.1rem",
            px: 6,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 20px rgba(42, 74, 79, 0.4)"
                : "0 4px 20px rgba(184, 218, 225, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1a3b40 0%, #0f2b30 100%)"
                  : "linear-gradient(135deg, #a5d1d8 0%, #8bc0c7 100%)",
              transform: "translateY(-2px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 6px 25px rgba(42, 74, 79, 0.5)"
                  : "0 6px 25px rgba(184, 218, 225, 0.4)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          {myInfo ? "수정하기" : "저장하기"}
        </Button>
      </Box>
    </Grow>
  );
};

export default SaveButton;
