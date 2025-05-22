import { Tooltip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface RealUser {
  name: string;
  profileImageUrl?: string;
}

interface RealUserTooltipProps {
  realUser: RealUser;
}

const RealUserTooltip = ({ realUser }: RealUserTooltipProps) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={realUser.name} onClick={() => navigate("/my")}>
      <Avatar
        sx={{
          color: "#c5a3d5",
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
        src={realUser.profileImageUrl}
      >
        {realUser.name?.[0] || "?"}
      </Avatar>
    </Tooltip>
  );
};

export default RealUserTooltip;
