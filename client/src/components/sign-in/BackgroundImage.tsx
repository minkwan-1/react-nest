import { Box, Typography, useTheme, keyframes } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// 다양한 둥둥 떠다니는 애니메이션 정의
const float1 = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(5px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const float2 = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(10px) translateX(-8px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const float3 = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  50% { transform: translateY(-12px) translateX(-5px) rotate(5deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

const float4 = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  33% { transform: translateY(-7px) translateX(7px) rotate(2deg); }
  66% { transform: translateY(5px) translateX(-3px) rotate(-2deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

const pulsate = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const BackgroundImage = () => {
  const theme = useTheme();
  const keyColor = "#03cb84"; // 키 컬러 정의

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
      {/* 배경 패턴 - 애니메이션 추가 */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0.05,
          animation: `${float3} 80s linear infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${keyColor.substring(
              1
            )}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${keyColor.substring(
              1
            )}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            animation: `${float1} 6s ease-in-out infinite`,
            ...theme.applyStyles("light", {
              background: `rgba(${parseInt(
                keyColor.slice(1, 3),
                16
              )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                keyColor.slice(5, 7),
                16
              )}, 0.2)`,
              boxShadow: `0 8px 32px ${keyColor}30`,
            }),
            ...theme.applyStyles("dark", {
              background: `rgba(${parseInt(
                keyColor.slice(1, 3),
                16
              )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                keyColor.slice(5, 7),
                16
              )}, 0.2)`,
              boxShadow: `0 8px 32px ${keyColor}40`,
            }),
          }}
        >
          <LockOpenIcon
            sx={{
              fontSize: 50,
              animation: `${pulsate} 4s ease-in-out infinite 1s`,
              ...theme.applyStyles("light", {
                color: keyColor,
              }),
              ...theme.applyStyles("dark", {
                color: keyColor,
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

        {/* 특징 목록 - 아이콘에 애니메이션 추가 */}
        <Box sx={{ textAlign: "left", mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              transform: "translateZ(0)", // 성능 최적화
              "&:hover .icon-container": {
                transform: "translateY(-5px)",
                boxShadow: `0 8px 16px ${keyColor}30`,
              },
            }}
          >
            <Box
              className="icon-container"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
                transition: "all 0.3s ease",
                animation: `${float2} 7s ease-in-out infinite`,
                ...theme.applyStyles("light", {
                  background: `rgba(${parseInt(
                    keyColor.slice(1, 3),
                    16
                  )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                    keyColor.slice(5, 7),
                    16
                  )}, 0.2)`,
                }),
                ...theme.applyStyles("dark", {
                  background: `rgba(${parseInt(
                    keyColor.slice(1, 3),
                    16
                  )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                    keyColor.slice(5, 7),
                    16
                  )}, 0.2)`,
                }),
              }}
            >
              <HelpOutlineIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: keyColor,
                  }),
                  ...theme.applyStyles("dark", {
                    color: keyColor,
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              transform: "translateZ(0)", // 성능 최적화
              "&:hover .icon-container": {
                transform: "translateY(-5px)",
                boxShadow: `0 8px 16px ${keyColor}30`,
              },
            }}
          >
            <Box
              className="icon-container"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
                transition: "all 0.3s ease",
                animation: `${float3} 9s ease-in-out infinite 1s`,
                ...theme.applyStyles("light", {
                  background: `rgba(${parseInt(
                    keyColor.slice(1, 3),
                    16
                  )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                    keyColor.slice(5, 7),
                    16
                  )}, 0.2)`,
                }),
                ...theme.applyStyles("dark", {
                  background: `rgba(${parseInt(
                    keyColor.slice(1, 3),
                    16
                  )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                    keyColor.slice(5, 7),
                    16
                  )}, 0.2)`,
                }),
              }}
            >
              <CodeIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: keyColor,
                  }),
                  ...theme.applyStyles("dark", {
                    color: keyColor,
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              transform: "translateZ(0)", // 성능 최적화
              "&:hover .icon-container": {
                transform: "translateY(-5px)",
                boxShadow: `0 8px 16px ${keyColor}30`,
              },
            }}
          >
            <Box
              className="icon-container"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
                transition: "all 0.3s ease",
                animation: `${float4} 8s ease-in-out infinite 0.5s`,
                ...theme.applyStyles("light", {
                  background: `rgba(${parseInt(
                    keyColor.slice(1, 3),
                    16
                  )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                    keyColor.slice(5, 7),
                    16
                  )}, 0.2)`,
                }),
                ...theme.applyStyles("dark", {
                  background: `rgba(${parseInt(
                    keyColor.slice(1, 3),
                    16
                  )}, ${parseInt(keyColor.slice(3, 5), 16)}, ${parseInt(
                    keyColor.slice(5, 7),
                    16
                  )}, 0.2)`,
                }),
              }}
            >
              <ChatIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: keyColor,
                  }),
                  ...theme.applyStyles("dark", {
                    color: keyColor,
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

      {/* 장식용 원에 애니메이션 추가 */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          top: -150,
          right: -100,
          animation: `${float2} 20s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
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
          animation: `${float3} 25s ease-in-out infinite 2s`,
          ...theme.applyStyles("light", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            background: `radial-gradient(circle, ${keyColor}10 0%, transparent 70%)`,
          }),
        }}
      />

      {/* 추가 장식 요소들 */}
      <Box
        sx={{
          position: "absolute",
          width: 15,
          height: 15,
          borderRadius: "50%",
          top: "20%",
          right: "20%",
          animation: `${float1} 7s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: "50%",
          top: "60%",
          right: "25%",
          animation: `${float4} 9s ease-in-out infinite 1s`,
          ...theme.applyStyles("light", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 12,
          height: 12,
          borderRadius: "50%",
          bottom: "30%",
          left: "15%",
          animation: `${float2} 8s ease-in-out infinite 0.5s`,
          ...theme.applyStyles("light", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
          ...theme.applyStyles("dark", {
            background: `${keyColor}40`,
            boxShadow: `0 0 15px ${keyColor}30`,
          }),
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 25,
          height: 25,
          borderRadius: "50%",
          top: "40%",
          left: "10%",
          opacity: 0.2,
          animation: `${pulsate} 8s ease-in-out infinite`,
          ...theme.applyStyles("light", {
            backgroundImage: `radial-gradient(circle, ${keyColor} 0%, transparent 70%)`,
          }),
          ...theme.applyStyles("dark", {
            backgroundImage: `radial-gradient(circle, ${keyColor} 0%, transparent 70%)`,
          }),
        }}
      />
    </Box>
  );
};

export default BackgroundImage;
