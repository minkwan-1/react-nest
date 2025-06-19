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
import PhotoCameraIcon from "@mui/icons-material/Add";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import React from "react";

const keyColor = "#b8dae1";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

interface ProfileEditSectionProps {
  // 기존 props
  job: string;
  setJob: (job: string) => void;

  // 프로필 이미지 관련 props
  fileInputRef: React.RefObject<HTMLInputElement>;
  previewUrl: string | null;
  isUploading: boolean;
  handleCameraClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileEditSection = ({
  job,
  setJob,
  fileInputRef,
  previewUrl,
  isUploading,
  handleCameraClick,
  handleFileChange,
}: ProfileEditSectionProps) => {
  const theme = useTheme();
  const [userInfo] = useAtom(realUserInfo);

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
                background: gradientBg,
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(184, 218, 225, 0.3)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 25px rgba(184, 218, 225, 0.4)",
                },
                // 업로드 중일 때 투명도 조절
                opacity: isUploading ? 0.7 : 1,
              }}
              src={previewUrl || undefined}
              alt="Profile"
            >
              {!previewUrl && (userInfo?.name?.charAt(0)?.toUpperCase() || "U")}
            </Avatar>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={isUploading}
            />

            <IconButton
              onClick={handleCameraClick}
              disabled={isUploading}
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
                "&:disabled": {
                  bgcolor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled,
                },
                transition: "all 0.2s ease",
              }}
            >
              <PhotoCameraIcon fontSize="small" />
            </IconButton>

            {/* 업로드 중 표시 */}
            {isUploading && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.75rem",
                }}
              >
                업로드 중...
              </Box>
            )}
          </Box>

          {/* job 입력 필드 */}
          <Box flex={1}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="직업"
                variant="outlined"
                value={job}
                onChange={(e) => setJob(e.target.value)}
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
