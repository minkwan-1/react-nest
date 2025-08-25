import React, { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogoutUser } from "@domains/auth/api/useAuthHooks";

const SessionExpiredPage: React.FC = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutUser(false);

  useEffect(() => {
    logoutMutation.mutate();
  }, []);

  const handleGoToLogin = () => {
    navigate("/start");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        세션이 만료되었습니다
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        안전한 서비스 이용을 위해 다시 로그인해주세요.
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoToLogin}
        sx={{ backgroundColor: "#b8dae1" }}
      >
        로그인 페이지로 이동
      </Button>
    </Box>
  );
};

export default SessionExpiredPage;
