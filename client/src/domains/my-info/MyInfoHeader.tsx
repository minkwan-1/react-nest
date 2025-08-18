import { realUserInfo } from "@atom/auth";
import { Box, Paper, Typography } from "@mui/material";
import { useAtom } from "jotai";
import useFetchMyInfo from "./hooks/useFetchMyInfo";

const MyInfoHeader = () => {
  const [userInfo] = useAtom(realUserInfo);
  const myInfo = useFetchMyInfo(userInfo?.user.id);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: `5px solid #b8dae1`,
        backgroundColor: "action.hover",
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="600">
          {myInfo ? "내 정보 수정" : "내 정보 등록"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {myInfo ? "프로필 정보를 업데이트하세요" : "프로필 정보를 등록하세요"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MyInfoHeader;
