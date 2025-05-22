import { Avatar } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
const AIAvatar = () => {
  return (
    <Avatar
      sx={{
        bgcolor: "#c5a3d5",
        width: 38,
        height: 38,
      }}
    >
      <SmartToyOutlinedIcon fontSize="small" />
    </Avatar>
  );
};

export default AIAvatar;
