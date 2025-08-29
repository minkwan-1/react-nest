import { Box, useTheme } from "@mui/material";
import { float1, float2, float3, float4, pulsate } from "./animation";

interface DecorativeElementsProps {
  keyColor: string;
}

const DecorativeElements = ({ keyColor }: DecorativeElementsProps) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          top: -150,
          right: -100,
          animation: `${float2} 20s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          bottom: -100,
          left: -50,
          animation: `${float3} 25s ease-in-out infinite 2s`,
          ...theme.applyStyles("light", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 15,
          height: 15,
          borderRadius: "50%",
          top: "20%",
          right: "20%",
          animation: `${float1} 7s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: "50%",
          top: "60%",
          right: "25%",
          animation: `${float4} 9s ease-in-out infinite 1s`,
          ...theme.applyStyles("light", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 12,
          height: 12,
          borderRadius: "50%",
          bottom: "30%",
          left: "15%",
          animation: `${float2} 8s ease-in-out infinite 0.5s`,
          ...theme.applyStyles("light", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 25,
          height: 25,
          borderRadius: "50%",
          top: "40%",
          left: "10%",
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
    </>
  );
};

export default DecorativeElements;
