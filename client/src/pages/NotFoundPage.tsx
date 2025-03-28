import { Box, Typography, Button } from "@mui/material";
import { ComponentWrapper } from "../components/layout/common";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoLanding = () => {
    navigate("/");
  };

  return (
    <ComponentWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "80vh",
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            mb: 2,
            color: (theme) => {
              return {
                ...theme.applyStyles("light", {
                  color: "black",
                }),
                ...theme.applyStyles("dark", {
                  color: "white",
                }),
              };
            },
          }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          페이지를 찾을 수 없습니다.
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
        </Typography>
        <Button
          onClick={handleGoLanding}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "black",
            color: "white",
          }}
        >
          홈으로 돌아가기
        </Button>
      </Box>
    </ComponentWrapper>
  );
};

export default NotFoundPage;
