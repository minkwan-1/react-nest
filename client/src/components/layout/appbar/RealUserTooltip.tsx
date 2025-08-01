import { Tooltip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface RealUser {
  name: string;
}

interface RealUserTooltipProps {
  realUser: RealUser;
  userProfileImage?: string;
}

const RealUserTooltip = ({
  realUser,
  userProfileImage,
}: RealUserTooltipProps) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={realUser.name} onClick={() => navigate("/my")}>
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
        {!userProfileImage && (realUser.name?.[0] || "?")}
      </Avatar>
    </Tooltip>
  );
};

export default RealUserTooltip;
