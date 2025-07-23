import {
  Box,
  Divider,
  useTheme,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import InterestArea from "./InterestArea";
import SocialMedia from "./SocialMedia";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import useFetchMyInfo from "../my-info/hooks/useFetchMyInfo";

const LeftContentArea = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userInfo] = useAtom(realUserInfo);
  const { data: myInfo, isPending } = useFetchMyInfo(userInfo?.id);
  const socialLink = myInfo?.socialLinks;

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

  const containerSx = {
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
  };

  if (isPending) {
    return (
      <Box sx={containerSx}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={containerSx}>
      <MyInfo job={myInfo?.nickname} avatarUrl={myInfo?.profileImageUrl} />
      <Divider sx={{ width: "100%", mb: 2, bgcolor: themeColors.divider }} />
      <InterestArea interests={myInfo?.interests || []} />
      <Divider sx={{ width: "100%", mb: 2 }} />
      <SocialMedia socialLink={socialLink} />

      <Tooltip title="프로필 편집" arrow placement="top">
        <IconButton
          onClick={() => navigate("/my/edit")}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            bgcolor: "#b8dae1",
            color: "white",
            width: 40,
            height: 40,
            "&:hover": {
              bgcolor: "#a2cbd4",
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
    </Box>
  );
};

export default LeftContentArea;
