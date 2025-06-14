import { PageContainer, ComponentWrapper } from "@components/layout/common";
import {
  TextField,
  Typography,
  Box,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Paper,
  Button,
  useTheme,
  Fade,
  Grow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { realUserInfo } from "@atom/auth";
import { useAtom } from "jotai";
import axios from "axios";

const keyColor = "#b8dae1";
const lightKeyColor = "#f0f8fa";
const darkKeyColor = "#2a4a4f";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

const MyInfoEditPage = () => {
  const theme = useTheme();

  // 직업 상태 정의
  const [job, setJob] = useState("");
  // 관심 분야 상태 정의
  const [interests, setInterests] = useState<string[]>(["React", "Node.js"]);
  // 관심 분야 입력 필드 상태 정의
  const [interestInput, setInterestInput] = useState("");
  // 소셜 미디어 링크 상태 정의
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  // 유저 전역 상태
  const [userInfo] = useAtom(realUserInfo);
  const userId = userInfo?.id;
  // 로딩 상태 정의
  // const [loading, setLoading] = useState(true);
  // my info 상태 정의
  // const [myInfo, setMyInfo] = useState()

  // 상태 로깅
  console.log(userId);
  console.log({ job, interests, socialLinks, userId });

  // useEffect(() => {
  //   const fetchMyInfo = async () => {
  //     if(!userId){
  //       setLoading(false)
  //       return
  //     }

  //     try{
  //       setLoading(true)
  //       const response = await axios.get(
  //         `http://localhost:3000/self-intro?id=${userId}`
  //       );

  //     }catch(){}finally{}
  //   }
  // }, [userId]);

  // 관심 분야 추가 핸들러
  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  // 관심 분야 삭제 핸들러
  const handleDeleteInterest = (interestToDelete: string) => {
    setInterests(interests.filter((i) => i !== interestToDelete));
  };

  // 소셜 링크 입력값 변경 핸들러
  const handleSocialLinkChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
  };

  // 소셜 링크 필드 추가 핸들러
  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  // my info 최종 등록
  const handleSave = async () => {
    if (!userId) return;

    try {
      await axios.post("http://localhost:3000/my-info", {
        userId,
        job,
        interests,
        socialLinks,
      });
      alert("저장되었습니다.");
    } catch (err) {
      console.log("저장 실패: ", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Fade in timeout={800}>
          <Box>
            {/* 헤더 */}
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
                내 정보 수정
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  opacity: 0.9,
                  fontWeight: 300,
                }}
              >
                프로필 정보를 업데이트하세요
              </Typography>
            </Box>

            {/* 프로필 섹션 */}
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
                    {/* 아바타 - 현재는 하드코딩 */}
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
                      src="/default-profile.png"
                      alt="Profile"
                    >
                      M
                    </Avatar>
                    {/* 아바타 등록 버튼 - 현재는 동작 X */}
                    <IconButton
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

            {/* 관심 분야 */}
            <Grow in timeout={1200}>
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
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    "&::before": {
                      content: '""',
                      width: 4,
                      height: 20,
                      bgcolor: keyColor,
                      borderRadius: 2,
                      mr: 2,
                    },
                  }}
                >
                  관심 분야
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{ gap: 1.5 }}
                  >
                    {interests.map((interest, index) => (
                      <Chip
                        key={index}
                        label={interest}
                        onDelete={() => handleDeleteInterest(interest)}
                        sx={{
                          background:
                            theme.palette.mode === "dark"
                              ? `linear-gradient(135deg, ${darkKeyColor} 0%, #1a3b40 100%)`
                              : gradientBg,
                          color: "#fff",
                          fontWeight: 500,
                          "& .MuiChip-deleteIcon": {
                            color: "rgba(255,255,255,0.8)",
                            "&:hover": {
                              color: "white",
                            },
                          },
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow:
                              theme.palette.mode === "dark"
                                ? "0 4px 12px rgba(42, 74, 79, 0.4)"
                                : "0 4px 12px rgba(184, 218, 225, 0.3)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="추가할 관심 분야를 입력하세요"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.background.default
                            : lightKeyColor,
                        "&:hover": {
                          "& > fieldset": {
                            borderColor: keyColor,
                          },
                        },
                        "&.Mui-focused": {
                          "& > fieldset": {
                            borderColor: keyColor,
                          },
                        },
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleAddInterest}
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark" ? darkKeyColor : keyColor,
                      color: "white",
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark" ? "#1a3b40" : "#a5d1d8",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </Paper>
            </Grow>

            {/* 소셜 미디어 링크 */}
            <Grow in timeout={1400}>
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
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    "&::before": {
                      content: '""',
                      width: 4,
                      height: 20,
                      bgcolor: keyColor,
                      borderRadius: 2,
                      mr: 2,
                    },
                  }}
                >
                  소셜 미디어 링크
                </Typography>

                <Stack spacing={2.5}>
                  {socialLinks.map((link, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      placeholder="Github, Blog, LinkedIn 등의 링크를 입력하세요"
                      value={link}
                      onChange={(e) =>
                        handleSocialLinkChange(index, e.target.value)
                      }
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? theme.palette.background.default
                              : lightKeyColor,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            "& > fieldset": {
                              borderColor: keyColor,
                            },
                          },
                          "&.Mui-focused": {
                            "& > fieldset": {
                              borderColor: keyColor,
                            },
                          },
                        },
                      }}
                    />
                  ))}
                  <Button
                    onClick={handleAddSocialLink}
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{
                      alignSelf: "flex-start",
                      borderColor: keyColor,
                      color: keyColor,
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: keyColor,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.action.hover
                            : lightKeyColor,
                        transform: "translateY(-1px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 4px 12px rgba(42, 74, 79, 0.3)"
                            : "0 4px 12px rgba(184, 218, 225, 0.2)",
                      },
                    }}
                  >
                    링크 추가
                  </Button>
                </Stack>
              </Paper>
            </Grow>

            {/* 저장 버튼 */}
            <Grow in timeout={1800}>
              <Box textAlign="center" mb={5}>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  size="large"
                  sx={{
                    background:
                      theme.palette.mode === "dark"
                        ? `linear-gradient(135deg, ${darkKeyColor} 0%, #1a3b40 100%)`
                        : gradientBg,
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 20px rgba(42, 74, 79, 0.4)"
                        : "0 4px 20px rgba(184, 218, 225, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #1a3b40 0%, #0f2b30 100%)"
                          : "linear-gradient(135deg, #a5d1d8 0%, #8bc0c7 100%)",
                      transform: "translateY(-2px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 6px 25px rgba(42, 74, 79, 0.5)"
                          : "0 6px 25px rgba(184, 218, 225, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                  }}
                >
                  저장하기
                </Button>
              </Box>
            </Grow>
          </Box>
        </Fade>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default MyInfoEditPage;
