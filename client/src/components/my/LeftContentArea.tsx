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

  if (isPending) {
    return (
      <Box
        sx={{
          width: { xs: "100%", md: "320px" },
          height: "620px",
          p: 3,
          bgcolor: theme.palette.background.paper,
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
          border: theme.palette.mode === "dark" ? `1px solid #e0e0e0` : "",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "320px" },
        height: "620px",
        p: 3,
        bgcolor: theme.palette.background.paper,
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
        // border:
        //   theme.palette.mode === "dark"
        //     ? `1px solid ${
        //         theme.palette.mode === "light" ? "#e0e0e0" : "#333333"
        //       }`
        //     : "none",
      }}
    >
      <MyInfo nickname={myInfo?.nickname} avatarUrl={myInfo?.profileImageUrl} />
      <Divider
        sx={{
          width: "100%",
          mb: 2,
          bgcolor: theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
        }}
      />
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
