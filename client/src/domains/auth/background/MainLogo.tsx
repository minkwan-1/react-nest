import { Box, useTheme } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { float1, pulsate } from "./animation";

interface MainLogoProps {
  keyColor: string;
}

const MainLogo = ({ keyColor }: MainLogoProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
        mx: "auto",
        animation: `${float1} 6s ease-in-out infinite`,
        ...theme.applyStyles("light", {
          background: `rgba(${parseInt(keyColor.slice(1, 3), 16)}, ${parseInt(
            keyColor.slice(3, 5),
            16
          )}, ${parseInt(keyColor.slice(5, 7), 16)}, 0.2)`,
          boxShadow: `0 8px 32px ${keyColor}30`,
        }),
        ...theme.applyStyles("dark", {
          background: `rgba(${parseInt(keyColor.slice(1, 3), 16)}, ${parseInt(
            keyColor.slice(3, 5),
            16
          )}, ${parseInt(keyColor.slice(5, 7), 16)}, 0.2)`,
          boxShadow: `0 8px 32px ${keyColor}40`,
        }),
      }}
    >
      <LockOpenIcon
        sx={{
          fontSize: 50,
          animation: `${pulsate} 4s ease-in-out infinite 1s`,
          color: "#b8dae1",
        }}
      />
    </Box>
  );
};

export default MainLogo;
