import { useNavigate } from "react-router-dom";
import { Box, Typography, Theme, SxProps, useTheme } from "@mui/material";
import { Code } from "lucide-react";

interface AppbarLogoProps {
  sx?: SxProps<Theme>;
}

function AppbarLogo({ sx }: AppbarLogoProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...sx,
      }}
      onClick={() => navigate("/home")}
    >
      <Code size={24} className="text-primary" style={{ color: "#b8dae1" }} />

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginLeft: "8px",
          ...theme.applyStyles("light", {
            color: "black",
          }),
          ...theme.applyStyles("dark", {
            color: "white",
          }),
        }}
      >
        Pullim
      </Typography>
    </Box>
  );
}

export default AppbarLogo;
