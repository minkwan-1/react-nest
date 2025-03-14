import { Box, Typography, Theme, SxProps } from "@mui/material";
import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "@mui/material/styles";

interface AppbarLogoProps {
  sx?: SxProps<Theme>;
}

function AppbarLogo({ sx }: AppbarLogoProps) {
  const navigate = useNavigate();
  const { mode } = useColorScheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...sx,
      }}
      onClick={() => navigate("/")}
    >
      {/* Logo Icon */}
      <Code size={24} className="text-primary" style={{ color: "#03cb84" }} />

      {/* Logo Text */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginLeft: "8px",
          color: mode === "dark" ? "white" : "black",
        }}
      >
        Pullim
      </Typography>
    </Box>
  );
}

export default AppbarLogo;
