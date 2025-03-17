import { Box, Typography, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BackgroundImage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "50%",
        p: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        ...theme.applyStyles("light", {
          background: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
        }),
        ...theme.applyStyles("dark", {
          background: "linear-gradient(135deg, #222222 0%, #333333 100%)",
        }),
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
          ...theme.applyStyles("light", {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }),
        }}
      />

      {/* 메인 컨텐츠 */}
      <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 5,
            mx: "auto",
            ...theme.applyStyles("light", {
              background: "rgba(0, 0, 0, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
            }),
            ...theme.applyStyles("dark", {
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            }),
          }}
        >
          <LockOpenIcon
            sx={{
              fontSize: 50,
              ...theme.applyStyles("light", {
                color: "#333333",
              }),
              ...theme.applyStyles("dark", {
                color: "#f0f0f0",
              }),
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            ...theme.applyStyles("light", {
              color: "#333333",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }),
            ...theme.applyStyles("dark", {
              color: "#f0f0f0",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            }),
          }}
        >
          다시 오신 것을 환영합니다!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 7,
            maxWidth: "80%",
            mx: "auto",
            lineHeight: 1.7,
            fontWeight: 300,
            ...theme.applyStyles("light", {
              color: "#555555",
            }),
            ...theme.applyStyles("dark", {
              color: "#cccccc",
            }),
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
                ...theme.applyStyles("light", {
                  background: "rgba(0, 0, 0, 0.1)",
                }),
                ...theme.applyStyles("dark", {
                  background: "rgba(255, 255, 255, 0.1)",
                }),
              }}
            >
              <HelpOutlineIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#333333",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#f0f0f0",
                  }),
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  ...theme.applyStyles("light", {
                    color: "#333333",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#f0f0f0",
                  }),
                }}
              >
                질문하고 답변받기
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#555555",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#cccccc",
                  }),
                }}
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
                ...theme.applyStyles("light", {
                  background: "rgba(0, 0, 0, 0.1)",
                }),
                ...theme.applyStyles("dark", {
                  background: "rgba(255, 255, 255, 0.1)",
                }),
              }}
            >
              <CodeIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#333333",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#f0f0f0",
                  }),
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  ...theme.applyStyles("light", {
                    color: "#333333",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#f0f0f0",
                  }),
                }}
              >
                코드 리뷰 & 공유
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#555555",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#cccccc",
                  }),
                }}
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
                ...theme.applyStyles("light", {
                  background: "rgba(0, 0, 0, 0.1)",
                }),
                ...theme.applyStyles("dark", {
                  background: "rgba(255, 255, 255, 0.1)",
                }),
              }}
            >
              <ChatIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#333333",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#f0f0f0",
                  }),
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  ...theme.applyStyles("light", {
                    color: "#333333",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#f0f0f0",
                  }),
                }}
              >
                커뮤니티와 교류
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#555555",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#cccccc",
                  }),
                }}
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
          top: -150,
          right: -100,
          ...theme.applyStyles("light", {
            background: "rgba(0, 0, 0, 0.02)",
          }),
          ...theme.applyStyles("dark", {
            background: "rgba(255, 255, 255, 0.02)",
          }),
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          bottom: -100,
          left: -50,
          ...theme.applyStyles("light", {
            background: "rgba(0, 0, 0, 0.03)",
          }),
          ...theme.applyStyles("dark", {
            background: "rgba(255, 255, 255, 0.03)",
          }),
        }}
      />
    </Box>
  );
};

export default BackgroundImage;
