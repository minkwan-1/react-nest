import { Box, Typography, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

const BackgroundImage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "50%",
        p: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        ...theme.applyStyles("light", {
          bgcolor: "#f8f8f8",
          backgroundImage: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
        }),
        ...theme.applyStyles("dark", {
          bgcolor: "#222222",
          backgroundImage: "linear-gradient(135deg, #222222 0%, #333333 100%)",
        }),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          opacity: 0.6,
          zIndex: 0,
          ...theme.applyStyles("light", {
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05) 0%, transparent 70%)",
          }),
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }),
        }}
      />

      <Box
        sx={{
          borderRadius: "50%",
          width: 90,
          height: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          mb: 5,
          ...theme.applyStyles("light", {
            backgroundImage:
              "linear-gradient(135deg, #555555 0%, #777777 100%)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          }),
          ...theme.applyStyles("dark", {
            backgroundImage:
              "linear-gradient(135deg, #444444 0%, #666666 100%)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
          }),
        }}
      >
        <CodeIcon sx={{ fontSize: 40, color: "white" }} />
      </Box>

      <Typography
        variant="h5"
        sx={{
          mb: 3,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          fontWeight: 600,
          ...theme.applyStyles("light", {
            color: "#333333",
          }),
          ...theme.applyStyles("dark", {
            color: "#f5f5f5",
          }),
        }}
      >
        코딩의 모든 문제, Pullim과 함께
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          maxWidth: "80%",
          lineHeight: 1.6,
          ...theme.applyStyles("light", {
            color: "#555555",
          }),
          ...theme.applyStyles("dark", {
            color: "#b0b0b0",
          }),
        }}
      >
        안녕하세요! Pullim에 오신 것을 환영합니다. 프로그래밍과 관련된 모든
        질문에 대해 빠르고 정확한 답변을 얻으세요. 경험 많은 개발자들이 여러분의
        문제 해결을 도와드립니다.
      </Typography>

      {/* 추가 장식 요소 */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 16,
          height: 16,
          borderRadius: "50%",
          opacity: 0.7,
          ...theme.applyStyles("light", {
            backgroundImage:
              "linear-gradient(135deg, #555555 0%, #777777 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }),
          ...theme.applyStyles("dark", {
            backgroundImage:
              "linear-gradient(135deg, #444444 0%, #666666 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "15%",
          width: 10,
          height: 10,
          borderRadius: "50%",
          opacity: 0.5,
          ...theme.applyStyles("light", {
            backgroundImage:
              "linear-gradient(135deg, #555555 0%, #777777 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }),
          ...theme.applyStyles("dark", {
            backgroundImage:
              "linear-gradient(135deg, #444444 0%, #666666 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          opacity: 0.6,
          ...theme.applyStyles("light", {
            backgroundImage:
              "linear-gradient(135deg, #555555 0%, #777777 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }),
          ...theme.applyStyles("dark", {
            backgroundImage:
              "linear-gradient(135deg, #444444 0%, #666666 100%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }),
        }}
      />
    </Box>
  );
};

export default BackgroundImage;
