import { realUserInfo } from "@atom/auth";
import { Box, Typography, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import useFetchMyInfo from "./hooks/useFetchMyInfo";

const darkKeyColor = "#2a4a4f";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

const MyInfoHeader = () => {
  const theme = useTheme();
  const [userInfo] = useAtom(realUserInfo);
  const myInfo = useFetchMyInfo(userInfo?.id);

  return (
    <Box
      sx={{
        background: gradientBg,
        borderRadius: 3,
        p: 4,
        mb: 4,
        color: "white",
        textAlign: "center",
        ...(theme.palette.mode === "dark" && {
          background: `linear-gradient(135deg, ${darkKeyColor} 0%, #1a3b40 100%)`,
          border: `1px solid ${theme.palette.divider}`,
        }),
      }}
    >
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          letterSpacing: "0.5px",
        }}
      >
        {myInfo ? "내 정보 수정" : "내 정보 등록"}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 1,
          opacity: 0.9,
          fontWeight: 300,
        }}
      >
        {myInfo ? "프로필 정보를 업데이트하세요" : "프로필 정보를 등록하세요"}
      </Typography>
    </Box>
  );
};

export default MyInfoHeader;
