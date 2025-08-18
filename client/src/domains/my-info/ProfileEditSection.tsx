import {
  Grow,
  Paper,
  Stack,
  Box,
  Avatar,
  IconButton,
  TextField,
  alpha,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

interface ProfileEditSectionProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  handleProfileImageUpload: (base64Image: string) => void;
}

const ProfileEditSection = ({
  nickname,
  setNickname,
  profileImageUrl,
  handleProfileImageUpload,
}: ProfileEditSectionProps) => {
  const [userInfo] = useAtom(realUserInfo);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;
        await handleProfileImageUpload(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grow in timeout={1000}>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "background.paper",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[4],
            transform: "translateY(-2px)",
          },
        })}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <Box position="relative">
            <Avatar
              sx={(theme) => ({
                width: 100,
                height: 100,
                fontSize: "36px",
                fontWeight: "bold",
                bgcolor: "#b8dae1",
                color: "primary.contrastText",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: `0 4px 20px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 6px 25px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                },
              })}
              alt="Profile"
              src={profileImageUrl}
            >
              {!profileImageUrl &&
                (userInfo?.user.name?.charAt(0)?.toUpperCase() || "U")}
            </Avatar>

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: -5,
                  right: -5,
                  bgcolor: "#b8dae1",
                  color: "secondary.contrastText",
                  width: 32,
                  height: 32,
                  "&:hover": {
                    bgcolor: "#b8dae1",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </label>
          </Box>

          <Box flex={1}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="닉네임"
                variant="outlined"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Grow>
  );
};

export default ProfileEditSection;
