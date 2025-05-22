import { IconButton, Theme, SxProps } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorScheme } from "@mui/material/styles";

interface ThemeToggleButtonProps {
  sx?: SxProps<Theme>;
}

function ThemeToggleButton({ sx }: ThemeToggleButtonProps) {
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      onClick={toggleMode}
      sx={{
        color: "#b8dae1",
        border: "1px solid #adb5be",
        width: "32px",
        height: "32px",
        ...sx,
      }}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ThemeToggleButton;
