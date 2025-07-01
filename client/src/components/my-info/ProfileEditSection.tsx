import {
  Grow,
  Paper,
  Stack,
  Box,
  Avatar,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

const keyColor = "#b8dae1";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

interface ProfileEditSectionProps {
  nickname: string;
  setNickname: (job: string) => void;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  handleProfileImageUpload: (base64Image: string) => Promise<void>;
}

const ProfileEditSection = ({
  nickname,
  setNickname,
  profileImageUrl,

  handleProfileImageUpload,
}: ProfileEditSectionProps) => {
  const theme = useTheme();
  const [userInfo] = useAtom(realUserInfo);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;
        // 기존의 setProfileImageUrl 대신 handleProfileImageUpload 사용
        await handleProfileImageUpload(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grow in timeout={1000}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
              : "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 25px rgba(0,0,0,0.3)"
                : "0 8px 25px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <Box position="relative">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: "36px",
                fontWeight: "bold",
                background: profileImageUrl ? "transparent" : gradientBg,
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(184, 218, 225, 0.3)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 25px rgba(184, 218, 225, 0.4)",
                },
              }}
              alt="Profile"
              src={profileImageUrl}
            >
              {!profileImageUrl &&
                (userInfo?.name?.charAt(0)?.toUpperCase() || "U")}
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
                  bgcolor: keyColor,
                  color: "white",
                  width: 32,
                  height: 32,
                  "&:hover": {
                    bgcolor: "#a5d1d8",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </label>
          </Box>
          {/* job 입력 필드 */}
          <Box flex={1}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="닉네임"
                variant="outlined"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      "& > fieldset": {
                        borderColor: keyColor,
                      },
                    },
                    "&.Mui-focused": {
                      "& > fieldset": {
                        borderColor: keyColor,
                        borderWidth: 2,
                      },
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: keyColor,
                  },
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Grow>
  );
};

export default ProfileEditSection;
