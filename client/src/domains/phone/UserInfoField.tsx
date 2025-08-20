import { Box, Typography, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { SetStateAction } from "jotai";
import type { signupUserInfo } from "@atom/auth";

export interface UserInfoFieldProps {
  userInfo: signupUserInfo | null;
  setUserInfo: (userInfo: SetStateAction<signupUserInfo | null>) => void;
}

const UserInfoField = ({ userInfo }: UserInfoFieldProps) => {
  // 유저 이름과 이메일 정보 가져오기 (없을 경우 기본값 설정)
  const name = userInfo?.name || "이름 정보 없음";
  const email = userInfo?.email || "이메일 정보 없음";

  return (
    // 전체 회원 정보 카드 UI 컨테이너
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* 상단 섹션: 타이틀 영역 */}
      <Box
        sx={{
          py: 1.5,
          px: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ color: "#b8dae1" }}
        >
          회원 정보
        </Typography>
      </Box>

      {/* 하단 섹션: 아바타 + 이름/이메일 정보 */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* 이름과 이메일 정보 */}
        <Box sx={{ width: "100%" }}>
          {/* 이름 영역 */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <PersonIcon
                fontSize="small"
                sx={{ color: "text.secondary", mr: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                이름
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={500}>
              {name}
            </Typography>
          </Box>

          {/* 이메일 영역 */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <EmailIcon
                fontSize="small"
                sx={{ color: "text.secondary", mr: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                이메일
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={500}>
              {email}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserInfoField;
