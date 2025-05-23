import React from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Container,
  useTheme,
  Grid,
  Chip,
  Divider,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";

// Icons imports
import {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
} from "@mui/icons-material";

// Import the CommonCard component and atoms
import CommonCard from "@components/common/Card";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { realUserInfo } from "@atom/auth";

interface UserProfileProps {
  username: string;
  avatarUrl: string;
  reputation: number;
  badges: string[];
  questionsAnswered: number;
  questionsAsked: number;
  bio: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username = "김트렌드",
  avatarUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2022&auto=format&fit=crop",
  reputation = 3842,
  badges = [
    "E-커머스 전문가",
    "뉴스레터 마스터",
    "소셜 인플루언서",
    "트렌드 분석가",
  ],
}) => {
  const theme = useTheme();
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [userInfo] = useAtom(realUserInfo);

  // Fetch questions data like in TestPage
  useEffect(() => {
    if (!userInfo?.id) {
      setQuestions([]);
      return;
    }

    const fetchQuestionsByUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/questions/user/${userInfo.id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching user's questions:", error);
      }
    };

    fetchQuestionsByUser();
  }, [userInfo, setQuestions]);

  // Define theme colors for easy reference
  const themeColors = {
    primary: theme.palette.primary.main,
    primaryDark: "#02b676",
    background: theme.palette.mode === "light" ? "#f8f9fa" : "#121212",
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    accent: "#FF9F1C",
    accent2: "#7678ED",
    success: "#2EC4B6",
    warning: "#E71D36",
    divider: theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
  };

  // Translated content for Korean language sections
  const koreanContent = {
    overview: "소개",
    articles: "작성한 아티클",
    replies: "작성한 댓글",
    selfIntro: "자기 소개",
    introText:
      "국내 최대 프로그래밍 Q&A 서비스, Pullim를 운영하고 있는 원민관입니다. 최신 트렌드와 인사이트를 제공합니다.",
    serviceIntro: "서비스 소개",
    serviceText:
      "국내 최대 프로그래밍 Q&A 플랫폼 Pullim(풀림)은 개발자들이 겪는 다양한 문제를 함께 해결하며 성장할 수 있도록 돕는 지식 공유 커뮤니티입니다. 초보부터 전문가까지 누구나 자유롭게 질문하고, 실시간으로 사람과 AI 모두에게 답변을 받을 수 있어 '문제가 풀리는 경험'을 빠르고 깊이 있게 제공합니다. 특히 상세 페이지에서는 기존 답변을 기반으로 AI가 추가 설명이나 예제를 실시간 생성해 주는 기능도 제공되어, 복잡한 개념도 더 쉽게 이해할 수 있습니다. 코드 한 줄의 고민도 함께 나누는 풀림에서, 더 나은 개발자로 성장해 보세요.",
    socialMedia: "소셜 미디어",
    followers: "팔로워",
    following: "팔로잉",
    stats: "활동 통계",
    interests: "관심 분야",
    activity: "최근 활동",
    subscriptions: "구독 신청",
    badges: "획득한 배지",
    popularPosts: "나의 질문",
    recentActivity: "최근 활동",
    recommendedTopics: "추천 토픽",
    achievements: "업적",
    insight: "최근 인사이트",
    newsletter: "뉴스레터 구독하기",
    memberSince: "가입일",
    lastActive: "최근 활동",
    viewProfile: "프로필 보기",
    editProfile: "프로필 수정",
    messageMe: "메시지 보내기",
    copyChat: "카피챗",
    viewAll: "전체보기",
    trending: "트렌딩",
    search: "검색",
    newPost: "새 글쓰기",
    subscribeNewsletter: "뉴스레터 구독하기",
  };

  // Sample article data adapted for CommonCard
  const questionData = questions || [];

  // User data for CommonCard - use real userInfo
  const userData = {
    id: userInfo?.id || 1,
    name: userInfo?.name || username,
  };

  // Sample interest tags
  const interestTags = [
    "Full-stack Development",
    "NestJS",
    "TypeScript",
    "ReactJS",
    "NextJS",
    "Git",
    "AWS",
    "CI/CD",
    "Software Architecture",
    "Test Automation",
    "DevOps",
  ];

  // Event handlers for CommonCard
  const handleCardClick = (questionId: number | string) => {
    console.log("Card clicked:", questionId);
    // Add navigation logic here
  };

  const handleAnswerClick = (questionId: number | string) => {
    console.log("Answer clicked:", questionId);
    // Add answer logic here
  };

  const handleLikeClick = (questionId: number | string) => {
    console.log("Like clicked:", questionId);
    // Add like logic here
  };

  const handleBookmarkClick = (questionId: number | string) => {
    console.log("Bookmark clicked:", questionId);
    // Add bookmark logic here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: themeColors.background,
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 50, md: 100 },
          bgcolor:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #b8dae1 0%, #ccaee3 100%)"
              : "linear-gradient(135deg, #1e3a3f 0%, #0d4f3c 100%)",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #b8dae1 0%, #ccaee3 100%)"
              : "linear-gradient(135deg, #1e3a3f 0%, #0d4f3c 100%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          mt: { xs: -6, md: -8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {/* Left Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", md: "320px" },
              p: 3,
              bgcolor: themeColors.cardBg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 2,
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 2px 12px rgba(0,0,0,0.08)"
                  : "0 2px 12px rgba(0,0,0,0.3)",
              position: "relative",
              border:
                theme.palette.mode === "dark"
                  ? `1px solid ${themeColors.border}`
                  : "none",
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title="인증된 프로필">
                  <VerifiedIcon
                    sx={{
                      backgroundColor: themeColors.cardBg,
                      borderRadius: "50%",
                      color: "#b8dae1",
                      width: 24,
                      height: 24,
                      padding: "2px",
                      border:
                        theme.palette.mode === "dark"
                          ? `2px solid ${themeColors.border}`
                          : "2px solid white",
                    }}
                  />
                </Tooltip>
              }
            >
              <Avatar
                alt={userInfo?.name || username}
                src={avatarUrl}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border:
                    theme.palette.mode === "light"
                      ? "4px solid white"
                      : `4px solid ${themeColors.cardBg}`,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 2px 8px rgba(0,0,0,0.15)"
                      : "0 2px 8px rgba(0,0,0,0.4)",
                }}
              />
            </Badge>

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
              {userInfo?.name || username}
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2, color: themeColors.textSecondary }}
            >
              Frontend Developer
            </Typography>

            <Box sx={{ width: "100%", display: "flex", gap: 1, mb: 3 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: "#b8dae1",
                  color: theme.palette.mode === "light" ? "#000" : "#fff",
                  borderRadius: 3,
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#02b676",
                    color: "#fff",
                  },
                }}
              >
                팔로우
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                mb: 3,
                color: themeColors.textSecondary,
                gap: 3,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {reputation > 1000
                    ? Math.floor(reputation / 100) / 10 + "K"
                    : reputation}
                </Typography>
                <Typography variant="caption">
                  {koreanContent.followers}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {badges.length * 12}
                </Typography>
                <Typography variant="caption">
                  {koreanContent.following}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  {questionData.length}
                </Typography>
                <Typography variant="caption">글</Typography>
              </Box>
            </Box>

            <Divider
              sx={{ width: "100%", mb: 2, bgcolor: themeColors.divider }}
            />

            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ width: "100%", textAlign: "left", mb: 1 }}
            >
              {koreanContent.interests}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                mb: 3,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              {interestTags.slice(0, 8).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: themeColors.border,
                    color: themeColors.textSecondary,
                    fontSize: "0.75rem",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(3, 203, 132, 0.08)"
                          : "rgba(184, 218, 225, 0.1)",
                      borderColor: "#b8dae1",
                      color:
                        theme.palette.mode === "light"
                          ? themeColors.primaryDark
                          : "#b8dae1",
                    },
                  }}
                />
              ))}
              {interestTags.length > 8 && (
                <Chip
                  label={`+${interestTags.length - 8}`}
                  size="small"
                  sx={{
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(3, 203, 132, 0.08)"
                        : "rgba(184, 218, 225, 0.1)",
                    color:
                      theme.palette.mode === "light"
                        ? themeColors.primary
                        : "#b8dae1",
                    fontSize: "0.75rem",
                  }}
                />
              )}
            </Box>

            <Divider sx={{ width: "100%", mb: 2 }} />

            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ width: "100%", textAlign: "left", mb: 1 }}
            >
              {koreanContent.socialMedia}
            </Typography>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                mb: 2,
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <IconButton
                size="small"
                sx={{
                  color: "#E4405F",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(228, 64, 95, 0.1)"
                        : "rgba(228, 64, 95, 0.2)",
                  },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#0A66C2",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(10, 102, 194, 0.1)"
                        : "rgba(10, 102, 194, 0.2)",
                  },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: theme.palette.mode === "light" ? "#333" : "#fff",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(51, 51, 51, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Right Content Area */}
          <Box sx={{ flex: 1, p: 0, borderRadius: 2 }}>
            {/* Content Sections */}
            <Box>
              <Grid spacing={2}>
                <Grid item xs={14} md={8}>
                  {/* Self Introduction Section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      bgcolor: themeColors.cardBg,
                      borderRadius: 2,
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 2px 12px rgba(0,0,0,0.04)"
                          : "0 2px 12px rgba(0,0,0,0.2)",
                      border:
                        theme.palette.mode === "dark"
                          ? `1px solid ${themeColors.border}`
                          : "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      {koreanContent.selfIntro}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: themeColors.textSecondary,
                        lineHeight: 1.7,
                      }}
                    >
                      {koreanContent.introText}
                    </Typography>
                  </Paper>

                  {/* Service Introduction Section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      bgcolor: themeColors.cardBg,
                      borderRadius: 2,
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 2px 12px rgba(0,0,0,0.04)"
                          : "0 2px 12px rgba(0,0,0,0.2)",
                      border:
                        theme.palette.mode === "dark"
                          ? `1px solid ${themeColors.border}`
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {koreanContent.serviceIntro}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: themeColors.textSecondary,
                        mb: 2,
                        lineHeight: 1.7,
                      }}
                    >
                      {koreanContent.serviceText}
                    </Typography>
                  </Paper>

                  {/* Popular Articles Section with CommonCard */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      bgcolor: themeColors.cardBg,
                      borderRadius: 2,
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 2px 12px rgba(0,0,0,0.04)"
                          : "0 2px 12px rgba(0,0,0,0.2)",
                      border:
                        theme.palette.mode === "dark"
                          ? `1px solid ${themeColors.border}`
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {koreanContent.popularPosts}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {questionData.length > 0 ? (
                        questionData.map((question) => (
                          <CommonCard
                            key={question.id}
                            question={question}
                            user={userData}
                            onCardClick={handleCardClick}
                            onAnswerClick={handleAnswerClick}
                            onLikeClick={handleLikeClick}
                            onBookmarkClick={handleBookmarkClick}
                            showActions={true}
                          />
                        ))
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            아직 등록된 질문이 없습니다
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            첫 번째 질문을 등록해보세요!
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
