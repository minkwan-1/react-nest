import { Box, Typography } from "@mui/material";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";

const EmptyQuestionsState = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: { xs: 3, sm: 8 },
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LiveHelpOutlinedIcon
        sx={{
          fontSize: 64,
          mb: 2,
          color: "text.disabled",
        }}
      />
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        아직 검색어와 관련된 질문이 없어요
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        가장 먼저 질문을 등록하고 지식을 나눠보세요!
      </Typography>
    </Box>
  );
};

export default EmptyQuestionsState;
