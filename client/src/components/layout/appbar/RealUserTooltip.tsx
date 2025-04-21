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
          width: 40,
          height: 40,
          mr: 1,
          bgcolor: "#03cb84",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          border: "2px solid #fff",
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
