import React from "react";
import { Box, alpha } from "@mui/material";

interface BackgroundElementsProps {
  mainColor?: string;
}

export const BackgroundElements: React.FC<BackgroundElementsProps> = ({
  mainColor = "#c5a3d5",
}) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            mainColor,
            0.15
          )} 0%, ${alpha(mainColor, 0.02)} 70%, transparent 100%)`,
          top: "-150px",
          right: "-100px",
          zIndex: -1,
          filter: "blur(30px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            mainColor,
            0.1
          )} 0%, ${alpha(mainColor, 0.02)} 70%, transparent 100%)`,
          bottom: "0%",
          left: "-100px",
          zIndex: -1,
          filter: "blur(35px)",
        }}
      />
    </>
  );
};
