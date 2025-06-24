import { keyframes } from "@mui/material";

// 다양한 둥둥 떠다니는 애니메이션 정의
export const float1 = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(5px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

export const float2 = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(10px) translateX(-8px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

export const float3 = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  50% { transform: translateY(-12px) translateX(-5px) rotate(5deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

export const float4 = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  33% { transform: translateY(-7px) translateX(7px) rotate(2deg); }
  66% { transform: translateY(5px) translateX(-3px) rotate(-2deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

export const pulsate = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;
