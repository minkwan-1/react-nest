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
import React, { useRef, useState } from "react";

const keyColor = "#b8dae1";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

interface ProfileEditSectionProps {
  job: string;
  setJob: (job: string) => void;
}

const ProfileEditSection = ({ job, setJob }: ProfileEditSectionProps) => {
  const theme = useTheme();
  const [userInfo] = useAtom(realUserInfo);

  // 추가
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 추가
  const handleCameraClick = () => {
    console.log("아이콘 클릭 시 파일 input 열기");
    fileInputRef?.current?.click();
  };

  // 추가
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("선택한 이미지 파일 저장");
    const file = e.target?.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log("선택된 파일: ", file);
    }
  };

  // 추가
  console.log("선택된 이미지: ", selectedImage);

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
              }}
              // src={myInfo?.profileImage || "/default-profile.png"}
              alt="Profile"
            >
              {userInfo?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            {/* 추가 */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <IconButton
              // 추가
              onClick={handleCameraClick}
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
