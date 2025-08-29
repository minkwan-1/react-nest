import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import InterestArea from "./InterestArea";
import SocialMedia from "./SocialMedia";
import MyInfo from "./MyInfo";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { useFetchMyInfo } from "@domains/my-info/hooks/useFetchMyInfo";

const LeftContentArea = () => {
  const navigate = useNavigate();
  const [userInfo] = useAtom(realUserInfo);
  const { data: myInfo, isPending } = useFetchMyInfo(userInfo?.user.id);

  const socialLink = myInfo?.socialLinks;

  const containerStyles = {
    width: { xs: "100%", md: "320px" },
    height: "620px",
    p: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 2,
    position: "relative",
  };

  if (isPending) {
    return (
      <Box sx={containerStyles}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={containerStyles}>
      <MyInfo nickname={myInfo?.nickname} avatarUrl={myInfo?.profileImageUrl} />
      <Divider
        sx={{
          width: "100%",
          mb: 2,
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
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default LeftContentArea;
