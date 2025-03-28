import { Box, Typography, useTheme, keyframes } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

// 다양한 둥둥 떠다니는 애니메이션 정의
const float1 = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(5px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const float2 = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(10px) translateX(-8px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const float3 = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  50% { transform: translateY(-12px) translateX(-5px) rotate(5deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

const float4 = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  33% { transform: translateY(-7px) translateX(7px) rotate(2deg); }
  66% { transform: translateY(5px) translateX(-3px) rotate(-2deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

const pulsate = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const BackgroundImage = () => {
  const theme = useTheme();
  const keyColor = "#03cb84"; // 키 컬러 정의

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
              "radial-gradient(circle at 30% 30%, rgba(3, 203, 132, 0.05) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(3, 203, 132, 0.05) 0%, transparent 70%)",
          }),
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(3, 203, 132, 0.08) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(3, 203, 132, 0.08) 0%, transparent 70%)",
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
          animation: `${float1} 6s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}cc 100%)`,
            boxShadow: `0 10px 30px ${keyColor}40`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}dd 100%)`,
            boxShadow: `0 10px 30px ${keyColor}50`,
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

      {/* 추가 장식 요소 - 애니메이션 적용 */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 16,
          height: 16,
          borderRadius: "50%",
          opacity: 0.7,
          animation: `${float2} 7s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}cc 100%)`,
            boxShadow: `0 4px 8px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}dd 100%)`,
            boxShadow: `0 4px 8px ${keyColor}40`,
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
          animation: `${float3} 9s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}cc 100%)`,
            boxShadow: `0 4px 8px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}dd 100%)`,
            boxShadow: `0 4px 8px ${keyColor}40`,
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
          animation: `${float4} 8s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}cc 100%)`,
            boxShadow: `0 4px 8px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}dd 100%)`,
            boxShadow: `0 4px 8px ${keyColor}40`,
          }),
        }}
      />

      {/* 추가 장식 요소들 */}
      <Box
        sx={{
          position: "absolute",
          bottom: "35%",
          right: "25%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          opacity: 0.4,
          animation: `${float2} 10s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}cc 100%)`,
            boxShadow: `0 2px 4px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}dd 100%)`,
            boxShadow: `0 2px 4px ${keyColor}40`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: 12,
          height: 12,
          borderRadius: "50%",
          opacity: 0.5,
          animation: `${float3} 11s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}cc 100%)`,
            boxShadow: `0 3px 6px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(135deg, ${keyColor} 0%, ${keyColor}dd 100%)`,
            boxShadow: `0 3px 6px ${keyColor}40`,
          }),
        }}
      />

      {/* 빛나는 효과가 있는 더 큰 배경 요소 */}
      <Box
        sx={{
          position: "absolute",
          top: "75%",
          left: "65%",
          width: 25,
          height: 25,
          borderRadius: "50%",
          opacity: 0.2,
          animation: `${pulsate} 8s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `radial-gradient(circle, ${keyColor} 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `radial-gradient(circle, ${keyColor} 0%, transparent 70%)`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "70%",
          width: 20,
          height: 20,
          borderRadius: "50%",
          opacity: 0.15,
          animation: `${pulsate} 9s ease-in-out infinite 1s`,
          ...theme.applyStyles("light", {
            backgroundImage: `radial-gradient(circle, ${keyColor} 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `radial-gradient(circle, ${keyColor} 0%, transparent 70%)`,
          }),
        }}
      />
    </Box>
  );
};

export default BackgroundImage;
