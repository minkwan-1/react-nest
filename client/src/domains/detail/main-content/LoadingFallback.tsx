import { Box, CircularProgress } from "@mui/material";

const themeColors = {
  primary: "#b8dae1",
  primaryLight: "#f0f7f8",
  primaryDark: "#9cc7d0",
  background: "#FFFFFF",
  surface: "#f8fbfc",
  borderLight: "#e1f2f5",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E",
  downvote: "#EF4444",
  tag: {
    bg: "#e8f5f7",
    text: "#7ba8b3",
  },
  accepted: "#059669",
  code: {
    bg: "#f0f7f8",
    border: "#d1e9ec",
    text: "#374151",
  },
  ai: {
    primary: "#85c1cc",
    light: "#f2f8f9",
    border: "#b8dae1",
  },
  user: {
    primary: "#a8d1db",
    light: "#f4f9fa",
    border: "#c5e2e8",
  },
};

const LoadingFallback = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress sx={{ color: themeColors.primary }} />
    </Box>
  );
};

export default LoadingFallback;
