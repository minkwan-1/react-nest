import { Avatar } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
const AIAvatar = () => {
  return (
    <Avatar
      sx={{
        bgcolor: "#b8dae1",
        width: 38,
        height: 38,
      }}
    >
      <SmartToyOutlinedIcon fontSize="small" />
    </Avatar>
  );
};

export default AIAvatar;
