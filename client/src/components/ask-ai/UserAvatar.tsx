import { Avatar, alpha, useTheme } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const UserAvatar = () => {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
        width: 38,
        height: 38,
      }}
    >
      <PersonOutlineOutlinedIcon fontSize="small" />
    </Avatar>
  );
};

export default UserAvatar;
