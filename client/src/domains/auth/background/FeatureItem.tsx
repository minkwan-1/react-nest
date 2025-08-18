import { Box, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  keyColor: string;
  animation: string;
}

const FeatureItem = ({
  icon,
  title,
  description,
  keyColor,
  animation,
}: FeatureItemProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
        transform: "translateZ(0)", // 성능 최적화
        "&:hover .icon-container": {
          transform: "translateY(-5px)",
          boxShadow: `0 8px 16px ${keyColor}30`,
        },
      }}
    >
      <Box
        className="icon-container"
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: 2,
          transition: "all 0.3s ease",
          animation: animation,
          ...theme.applyStyles("light", {
            background: `rgba(${parseInt(keyColor.slice(1, 3), 16)}, ${parseInt(
              keyColor.slice(3, 5),
              16
            )}, ${parseInt(keyColor.slice(5, 7), 16)}, 0.2)`,
          }),
          ...theme.applyStyles("dark", {
            background: `rgba(${parseInt(keyColor.slice(1, 3), 16)}, ${parseInt(
              keyColor.slice(3, 5),
              16
            )}, ${parseInt(keyColor.slice(5, 7), 16)}, 0.2)`,
          }),
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            ...theme.applyStyles("light", {
              color: "#333333",
            }),
            ...theme.applyStyles("dark", {
              color: "#f0f0f0",
            }),
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...theme.applyStyles("light", {
              color: "#555555",
            }),
            ...theme.applyStyles("dark", {
              color: "#cccccc",
            }),
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureItem;
