import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const mainColor = "#03cb84";

  const handleGoLanding = () => {
    navigate("/home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background styling elements */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${mainColor}20`,
          top: "-100px",
          right: "-100px",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `${mainColor}10`,
          bottom: "-80px",
          left: "-80px",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            mb: 2,
            fontSize: { xs: "100px", md: "140px" },
            background: `linear-gradient(135deg, ${mainColor} 0%, #029e68 100%)`,
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 5px 15px ${mainColor}40`,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#333"),
          }}
        >
          페이지를 찾을 수 없습니다.
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            mb: 4,
            maxWidth: "500px",
            mx: "auto",
            px: 2,
          }}
        >
          요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
        </Typography>
        <Button
          onClick={handleGoLanding}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "12px 30px",
            borderRadius: "50px",
            background: `linear-gradient(135deg, ${mainColor} 0%, #029e68 100%)`,
            color: "white",
            boxShadow: `0 4px 14px ${mainColor}70`,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: `0 6px 20px ${mainColor}90`,
              transform: "translateY(-2px)",
              background: `linear-gradient(135deg, ${mainColor} 20%, #029e68 100%)`,
            },
          }}
        >
          홈으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
