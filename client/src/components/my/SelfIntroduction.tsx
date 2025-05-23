import { Paper, Typography, useTheme } from "@mui/material";

const SelfIntroduction = () => {
  const theme = useTheme();

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

  return (
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
  );
};

export default SelfIntroduction;
