import { Box, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

const BackgroundImage = () => (
  <Box
    sx={{
      width: "50%",
      bgcolor: "#F5F7FB",
      backgroundImage: "linear-gradient(135deg, #EFF1FA 0%, #F9FAFF 100%)",
      p: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        width: "120%",
        height: "120%",
        top: "-10%",
        left: "-10%",
        backgroundImage:
          "radial-gradient(circle at 30% 30%, rgba(188,197,255,0.3) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(169,182,255,0.3) 0%, transparent 70%)",
        opacity: 0.6,
        zIndex: 0,
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
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 10px 30px rgba(118, 75, 162, 0.4)",
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
        color: "#2D3748",
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
        color: "#2D3748",
        lineHeight: 1.6,
      }}
    >
      안녕하세요! Pullim에 오신 것을 환영합니다. 프로그래밍과 관련된 모든 질문에
      대해 빠르고 정확한 답변을 얻으세요. 경험 많은 개발자들이 여러분의 문제
      해결을 도와드립니다.
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
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        opacity: 0.7,
        boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
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
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        opacity: 0.5,
        boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
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
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        opacity: 0.6,
        boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
      }}
    />
  </Box>
);

export default BackgroundImage;
