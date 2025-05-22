import React from "react";
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
  LinearProgress,
  Badge,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Tooltip,
} from "@mui/material";

// Icons imports
import {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
  Public as PublicIcon,
} from "@mui/icons-material";

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
  // const isMobile = theme.breakpoints.down("md");

  // Define theme colors for easy reference
  const themeColors = {
    primary: theme.palette.primary.main,
    primaryDark: "#02b676",
    background: "#f8f9fa",
    cardBg: theme.palette.background.paper,
    border: "#e0e0e0",
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    accent: "#FF9F1C",
    accent2: "#7678ED",
    success: "#2EC4B6",
    warning: "#E71D36",
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
      "Pullim은 국내 최대 규모의 프로그래밍 Q&A 서비스로, '프로그래밍과 개발'에 대한 다양한 이야기들을 다룹니다. 매주 수요일 아침, 최신 트렌드와 업계 전문가의 실질적인 인사이트를 선별하여, 구독자분들의 메일함으로 전해드릴게요.",

    socialMedia: "소셜 미디어",
    followers: "팔로워",
    following: "팔로잉",
    stats: "활동 통계",
    interests: "관심 분야",
    activity: "최근 활동",
    subscriptions: "구독 신청",
    badges: "획득한 배지",
    popularPosts: "인기 게시물",
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

  // Sample article and answer data
  const questionData = [
    {
      id: 1,
      title: "MZ세대의 쇼핑 트렌드와 브랜드 충성도에 관한 분석",
      author: "김트렌드",
      date: "2025-03-15",
      content:
        "최근 MZ세대의 소비 패턴이 급변하고 있습니다. 가격보다 가치를 중시하는 소비 성향과 SNS를 통한 구매 결정 방식에 대해 알아봅시다.",
      thumbnail:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&auto=format&fit=crop&q=60",
      comments: 56,
      views: 3240,
      likes: 178,
      tags: ["MZ세대", "소비트렌드", "브랜드마케팅"],
    },
    {
      id: 2,
      title: "2025년 예상되는 D2C 브랜드의 성장 전략",
      author: "김트렌드",
      date: "2025-02-28",
      content:
        "미들맨을 거치지 않고 소비자에게 직접 판매하는 D2C 브랜드들의 성공 전략과 앞으로의 시장 전망에 대해 심층 분석합니다.",
      thumbnail:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60",
      comments: 43,
      views: 2850,
      likes: 142,
      tags: ["D2C", "이커머스", "브랜딩"],
    },
    {
      id: 3,
      title: "라이브 커머스의 진화: 인플루언서 마케팅과의 시너지",
      author: "김트렌드",
      date: "2025-01-05",
      content:
        "라이브 커머스와 인플루언서 마케팅의 결합이 만들어내는 새로운 쇼핑 경험과 판매 전략에 대해 알아봅니다.",
      thumbnail:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60",
      comments: 37,
      views: 2135,
      likes: 98,
      tags: ["라이브커머스", "인플루언서", "소셜미디어"],
    },
  ];

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

  // Sample analytics data
  const analyticsData = {
    articles: 28,
    comments: 142,
    likes: 876,
    views: 24509,
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 50, md: 100 },
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
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              position: "relative",
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title="인증된 프로필">
                  <VerifiedIcon
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      color: "#b8dae1",
                      width: 24,
                      height: 24,
                      padding: "2px",
                    }}
                  />
                </Tooltip>
              }
            >
              <Avatar
                alt={username}
                src={avatarUrl}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "4px solid white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </Badge>

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
              {username}
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
                  color: "#000",
                  borderRadius: 3,
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#02b676",
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
                  {analyticsData.articles}
                </Typography>
                <Typography variant="caption">글</Typography>
              </Box>
            </Box>

            <Divider sx={{ width: "100%", mb: 2 }} />

            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ width: "100%", textAlign: "left", mb: 1 }}
            >
              {koreanContent.stats}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Tooltip title="게시물 조회수">
                  <Box sx={{ textAlign: "center" }}>
                    <PublicIcon
                      fontSize="small"
                      sx={{ color: themeColors.accent2, mb: 0.5 }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {analyticsData.views.toLocaleString()}
                    </Typography>
                    <Typography variant="caption">조회</Typography>
                  </Box>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="받은 좋아요">
                  <Box sx={{ textAlign: "center" }}>
                    <FavoriteIcon
                      fontSize="small"
                      sx={{ color: themeColors.warning, mb: 0.5 }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {analyticsData.likes}
                    </Typography>
                    <Typography variant="caption">좋아요</Typography>
                  </Box>
                </Tooltip>
              </Grid>
            </Grid>

            <Divider sx={{ width: "100%", mb: 2 }} />

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
                      backgroundColor: "rgba(3, 203, 132, 0.08)",
                      borderColor: themeColors.primary,
                      color: themeColors.primaryDark,
                    },
                  }}
                />
              ))}
              {interestTags.length > 8 && (
                <Chip
                  label={`+${interestTags.length - 8}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(3, 203, 132, 0.08)",
                    color: themeColors.primary,
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
                  "&:hover": { bgcolor: "rgba(228, 64, 95, 0.1)" },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#0A66C2",
                  "&:hover": { bgcolor: "rgba(10, 102, 194, 0.1)" },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#333",
                  "&:hover": { bgcolor: "rgba(51, 51, 51, 0.1)" },
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
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
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
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
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

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        mt: 2,
                        mb: 1,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" fontWeight="medium">
                          구독자 성장률
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={72}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: "rgba(3, 203, 132, 0.1)",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor: "#b8dae1",
                                  borderRadius: 4,
                                },
                              }}
                            />
                          </Box>
                          <Typography variant="body2" fontWeight="bold">
                            72%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: themeColors.textSecondary }}
                        >
                          주간 구독자
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          25,420명
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: themeColors.textSecondary }}
                        >
                          오픈율
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          43.8%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: themeColors.textSecondary }}
                        >
                          클릭률
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          16.2%
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Popular Articles Section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      bgcolor: themeColors.cardBg,
                      borderRadius: 2,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
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

                    <Grid spacing={2}>
                      {questionData.map((article) => (
                        <Grid item xs={12} key={article.id}>
                          <Card
                            sx={{
                              display: "flex",
                              mb: 1,
                              boxShadow: "none",
                              border: `1px solid ${themeColors.border}`,
                              borderRadius: 2,
                              overflow: "hidden",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                                borderColor: "#b8dae1",
                              },
                            }}
                          >
                            <CardActionArea
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: "stretch",
                                height: "100%",
                              }}
                            >
                              <CardMedia
                                component="img"
                                sx={{
                                  width: { xs: "100%", sm: 140 },
                                  height: { xs: 140, sm: "auto" },
                                }}
                                image={article.thumbnail}
                                alt={article.title}
                              />
                              <CardContent sx={{ flex: 1, p: 2 }}>
                                <Box sx={{ mb: 1 }}>
                                  {article.tags.map((tag, i) => (
                                    <Chip
                                      key={i}
                                      label={tag}
                                      size="small"
                                      sx={{
                                        mr: 0.5,
                                        mb: 0.5,
                                        fontSize: "0.625rem",
                                        height: 20,
                                        bgcolor: `rgba(3, 203, 132, ${
                                          0.05 + i * 0.05
                                        })`,
                                        color: themeColors.primaryDark,
                                      }}
                                    />
                                  ))}
                                </Box>
                                <Typography
                                  variant="subtitle1"
                                  component="div"
                                  fontWeight="bold"
                                  sx={{ mb: 1 }}
                                >
                                  {article.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    mb: 1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {article.content}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 1,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {article.date}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1.5,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <FavoriteIcon
                                        sx={{
                                          fontSize: 14,
                                          mr: 0.5,
                                          color: themeColors.warning,
                                        }}
                                      />
                                      <Typography variant="caption">
                                        {article.likes}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CommentIcon
                                        sx={{
                                          fontSize: 14,
                                          mr: 0.5,
                                          color: themeColors.accent2,
                                        }}
                                      />
                                      <Typography variant="caption">
                                        {article.comments}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <PublicIcon
                                        sx={{
                                          fontSize: 14,
                                          mr: 0.5,
                                          color: themeColors.accent,
                                        }}
                                      />
                                      <Typography variant="caption">
                                        {article.views}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
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
