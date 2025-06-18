import { PageContainer, ComponentWrapper } from "@components/layout/common";
import {
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  Paper,
  Button,
  useTheme,
  Fade,
  Grow,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";
import { realUserInfo } from "@atom/auth";
import { useAtom } from "jotai";
import axios from "axios";
import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";
import {
  MyInfoHeader,
  ProfileEditSection,
  InterestsSection,
} from "@components/my-info";

const keyColor = "#b8dae1";
const lightKeyColor = "#f0f8fa";
const darkKeyColor = "#2a4a4f";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

// interface MyInfoType {
//   id: string;
//   userId: string;
//   job: string;
//   interests: string[];
//   socialLinks: string[];
//   createdAt: string;
//   updatedAt: string;
// }

const MyInfoEditPage = () => {
  const theme = useTheme();

  // 유저 전역 상태
  const [userInfo] = useAtom(realUserInfo);
  const userId = userInfo?.id;

  // 프로필 정보 가져오기 훅 적용
  const myInfo = useFetchMyInfo(userInfo?.id);

  // 폼 상태 정의
  const [job, setJob] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 ID가 있을 때 로딩 상태 설정
  useEffect(() => {
    if (userId) {
      // userId가 있으면 로딩 상태 유지, 없으면 로딩 완료
      setIsLoading(true);
    }
  }, [userId]);

  // 서버에서 받아온 myInfo 데이터로 폼 필드 초기화
  useEffect(() => {
    if (userId && myInfo !== null && !isInitialized) {
      console.log("서버에서 받아온 프로필 정보: ", myInfo);

      // 서버 데이터로 폼 필드 초기화
      setJob(myInfo?.job || "");
      setInterests(myInfo?.interests || []);
      setSocialLinks(myInfo?.socialLinks?.length ? myInfo.socialLinks : [""]);
      setIsInitialized(true);
      setIsLoading(false);
    } else if (userId && myInfo === null) {
      // myInfo가 null이면 (데이터가 없음) 기본값으로 초기화
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1초 후 로딩 완료 (API 응답 대기)
    }
  }, [myInfo, isInitialized, userId]);

  // 상태 로깅
  console.log(userId);
  console.log({ job, interests, socialLinks, userId });

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

  // 소셜 링크 필드 제거 핸들러
  const handleRemoveSocialLink = (index: number) => {
    if (socialLinks.length > 1) {
      const updated = socialLinks.filter((_, i) => i !== index);
      setSocialLinks(updated);
    }
  };

  // my info 최종 등록/수정 처리
  const handleSave = async () => {
    if (!userId) return;

    // 빈 소셜 링크 필터링
    const filteredSocialLinks = socialLinks.filter(
      (link) => link.trim() !== ""
    );

    try {
      const payload = {
        userId,
        job: job.trim(),
        interests,
        socialLinks: filteredSocialLinks,
      };

      console.log("저장할 데이터: ", payload);

      // 등록/수정 모두 동일한 POST 요청으로 처리
      await axios.post("http://localhost:3000/my-info", payload);

      alert(myInfo ? "정보가 수정되었습니다." : "정보가 저장되었습니다.");
    } catch (err) {
      console.log("저장 실패: ", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <PageContainer>
        <ComponentWrapper>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress sx={{ color: keyColor }} />
          </Box>
        </ComponentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ComponentWrapper>
        <Fade in timeout={800}>
          <Box>
            {/* 헤더 섹션 - component separation 대기 */}
            <MyInfoHeader />

            {/* 프로필 섹션 - component separation 대기 */}
            <ProfileEditSection job={job} setJob={setJob} />

            {/* 관심 분야 섹션 - component separation 대기 */}
            <InterestsSection
              interests={interests}
              handleDeleteInterest={handleDeleteInterest}
              interestInput={interestInput}
              setInterestInput={setInterestInput}
              handleAddInterest={handleAddInterest}
            />

            {/* 소셜 미디어 링크 섹션 - component separation 대기 */}
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
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <TextField
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

                      {socialLinks.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveSocialLink(index)}
                          size="small"
                          sx={{
                            color: theme.palette.error.main,
                            "&:hover": {
                              bgcolor: theme.palette.error.main + "20",
                            },
                          }}
                        >
                          ×
                        </IconButton>
                      )}
                    </Stack>
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

            {/* 저장 버튼 섹션 - component separation 대기 */}
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
                  {myInfo ? "수정하기" : "저장하기"}
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
