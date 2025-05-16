import { useNavigate } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
import axios from "axios";

const LogoutButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    console.log("로그아웃 버튼");
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      alert("로그아웃 되었삼");
      navigate("/");
    } catch (err) {
      console.log("로그아웃 실패: ", err);
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{
        color: "inherit",
        borderColor: "inherit",
        borderRadius: 50,
        px: 3,
        py: 1,
        textTransform: "none",
        fontWeight: 500,
        ...theme.applyStyles("light", {
          borderColor: "#00000025",
          color: "#333",
          "&:hover": {
            borderColor: "#00000050",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }),
        ...theme.applyStyles("dark", {
          borderColor: "#ffffff25",
          color: "#f0f0f0",
          "&:hover": {
            borderColor: "#ffffff50",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }),
      }}
      onClick={handleButtonClick}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
