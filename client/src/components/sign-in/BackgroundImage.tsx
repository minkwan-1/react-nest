import { Box, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BackgroundImage = () => (
  <Box
    sx={{
      width: "50%",
      background: "linear-gradient(135deg, #4338CA 0%, #6366F1 100%)",
      p: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* 배경 패턴 */}
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    {/* 메인 컨텐츠 */}
    <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          mx: "auto",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <LockOpenIcon sx={{ fontSize: 50, color: "white" }} />
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontWeight: 700,
          mb: 4,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        다시 오신 것을 환영합니다!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.9)",
          mb: 7,
          maxWidth: "80%",
          mx: "auto",
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        프로그래밍 커뮤니티와 함께 성장하세요. 전문가의 답변으로 코딩의 모든
        난관을 해결할 수 있습니다.
      </Typography>

      {/* 특징 목록 */}
      <Box sx={{ textAlign: "left", mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 2,
            }}
          >
            <HelpOutlineIcon sx={{ color: "white" }} />
          </Box>
          <Box>
            <Typography sx={{ color: "white", fontWeight: 500 }}>
              질문하고 답변받기
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              원하는 질문을 하고 빠르게 답변을 받으세요
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 2,
            }}
          >
            <CodeIcon sx={{ color: "white" }} />
          </Box>
          <Box>
            <Typography sx={{ color: "white", fontWeight: 500 }}>
              코드 리뷰 & 공유
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              코드를 공유하고 전문가의 피드백을 받으세요
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 2,
            }}
          >
            <ChatIcon sx={{ color: "white" }} />
          </Box>
          <Box>
            <Typography sx={{ color: "white", fontWeight: 500 }}>
              커뮤니티와 교류
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              다른 개발자들과 지식과 경험을 공유하세요
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>

    {/* 장식용 원 */}
    <Box
      sx={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.03)",
        top: -150,
        right: -100,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.04)",
        bottom: -100,
        left: -50,
      }}
    />
  </Box>
);

export default BackgroundImage;
