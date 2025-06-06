import { Box, Divider, useTheme, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import InterestArea from "./InterestArea";
import SocialMedia from "./SocialMedia";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";

const LeftContentArea = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const themeColors = {
    primary: theme.palette.primary.main,
    primaryDark: "#02b676",
    background: theme.palette.mode === "light" ? "#f8f9fa" : "#121212",
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    divider: theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "320px" },
        height: "620px",
        p: 3,
        bgcolor: themeColors.cardBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 2,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 2px 12px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.3)",
        position: "relative",
        border:
          theme.palette.mode === "dark"
            ? `1px solid ${themeColors.border}`
            : "none",
      }}
    >
      <MyInfo />

      <Tooltip title="프로필 편집" arrow>
        <IconButton
          onClick={() => navigate("/my/edit")}
          sx={{
            mt: 1,
            mb: 2,
            bgcolor: "#b8dae1",
            color: "white",
            width: 40,
            height: 40,
            "&:hover": {
              // bgcolor: themeColors.primaryDark,
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 2px 8px rgba(0,0,0,0.15)"
                : "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider sx={{ width: "100%", mb: 2, bgcolor: themeColors.divider }} />

      <InterestArea />

      <Divider sx={{ width: "100%", mb: 2 }} />

      <SocialMedia />
    </Box>
  );
};

export default LeftContentArea;
