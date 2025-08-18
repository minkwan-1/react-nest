import { Tooltip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFetchMyInfo from "@domains/my-info/hooks/useFetchMyInfo";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
// import { useFetchMeQuery } from "@domains/auth/api/useAuthHooks";

const RealUserTooltip = () => {
  const navigate = useNavigate();

  const [realUser] = useAtom(realUserInfo);
  // const { data: realUser } = useFetchMeQuery();

  const { data: myInfo } = useFetchMyInfo(realUser?.user?.id);

  console.log("realUser:", realUser?.user?.id);
  console.log("myInfo:", myInfo);

  const userProfileImage = myInfo?.profileImageUrl;

  return (
    <Tooltip title={realUser?.user.name} onClick={() => navigate("/my")}>
      <Avatar
        sx={{
          color: "#b8dae1",
          bgcolor: "white",
          border: "1px solid #adb5be",
          width: "32px",
          height: "32px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",

          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        src={userProfileImage || undefined}
      >
        {!userProfileImage && realUser?.name?.[0]}
      </Avatar>
    </Tooltip>
  );
};

export default RealUserTooltip;
