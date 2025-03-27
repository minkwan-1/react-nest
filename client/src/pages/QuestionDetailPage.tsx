import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Avatar,
  Button,
  IconButton,
  Paper,
  Stack,
  alpha,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { InfoIcon } from "lucide-react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CodeIcon from "@mui/icons-material/Code";
import PageContainer from "../components/layout/common/PageContainer";
import ComponentWrapper from "../components/layout/common/ComponentWrapper";

interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  author: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
  votes: number;
  views: number;
  answers: Answer[];
}

interface Answer {
  id: number;
  content: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
  votes: number;
  isAccepted: boolean;
}

// Mock data
const mockQuestion: Question = {
  id: 1,
  title: "개발자 하고 싶은데 어떤 것부터 공부해야 할까요?",
  content: `<p>랩보다 개발이 더 재밌어 보여요, 공부 방향에 대해 조언 해주세요!</p>
  <p>현재 리액트는 기초적인 내용을 알고 있고, 간단한 투두 앱 정도는 만들 수 있습니다. 하지만 실무에서 사용하는 기술 스택과 프로젝트 구조에 대해서는 잘 모릅니다.</p>
  <p>다음 중 어떤 것부터 공부하면 좋을까요?</p>
  <ul>
    <li>타입스크립트</li>
    <li>리덕스(또는 다른 상태 관리 라이브러리)</li>
    <li>서버사이드 렌더링(Next.js)</li>
    <li>테스팅(Jest, React Testing Library)</li>
  </ul>
  <p>실제 현업에서 개발자로 일하시는 분들의 조언이 필요합니다. 감사합니다!</p>`,
  tags: ["React", "JavaScript", "Frontend", "Web Development"],
  author: {
    username: "빈지노",
    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
  },
  createdAt: "2025-01-23T10:30:00Z",
  votes: 12,
  views: 245,
  answers: [
    {
      id: 101,
      content: `<p>안녕하세요! 현직 프론트엔드 개발자입니다.</p>
      <p>리액트를 기초적으로 알고 간단한 앱을 만들 수 있다면 좋은 출발점입니다. 제 경험상 다음 순서로 공부하시는 것이 효율적입니다:</p>
      <ol>
        <li><strong>타입스크립트</strong> - 현업에서는 거의 표준처럼 사용되고 있어요. 코드 품질과 유지보수성이 크게 향상됩니다.</li>
        <li><strong>상태 관리</strong> - Redux는 여전히 많이 쓰이지만, 요즘은 React Query, Zustand, Jotai 같은 더 가벼운 라이브러리들도 인기가 있습니다. 상황에 맞게 선택하는 안목을 기르는 것이 중요해요.</li>
        <li><strong>Next.js</strong> - SSR, SSG 등 다양한 렌더링 방식을 지원하고, 라우팅, 이미지 최적화 등 실무에서 필요한 기능들을 제공합니다.</li>
        <li><strong>테스팅</strong> - 실무에서 중요하지만, 위의 기술들을 어느 정도 익힌 후에 접근하는 것이 좋습니다.</li>
      </ol>
      <p>그리고 무엇보다 중요한 것은 실제 프로젝트를 만들어보는 것입니다. GitHub에 포트폴리오로 올릴 수 있는 프로젝트 몇 개를 만들어보세요. 기술 면접에서 큰 도움이 됩니다.</p>
      <p>화이팅하세요! 🚀</p>`,
      author: {
        username: "침착맨",
        avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
      },
      createdAt: "2025-01-22T14:15:00Z",
      votes: 20,
      isAccepted: false,
    },
    {
      id: 102,
      content: `<p>현직 개발자로서 조언드립니다.</p>
      <p>위에 침착맨님 답변에 더해 몇 가지 추가하자면:</p>
      <ul>
        <li>API 통신 방법에 대해 깊게 공부하세요 (fetch, axios, SWR/React Query)</li>
        <li>CI/CD와 배포 과정에 대한 기본적인 이해가 있으면 좋습니다</li>
        <li>개발자 도구와 디버깅 방법을 능숙하게 다루는 것이 실무에서 매우 중요합니다</li>
      </ul>
      <p>개인적으로는 타입스크립트 → 상태관리 → API 통신 → Next.js 순서로 공부하는 것을 추천합니다.</p>`,
      author: {
        username: "주호민",
        avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
      },
      createdAt: "2025-01-22T16:45:00Z",
      votes: 8,
      isAccepted: false,
    },
    {
      id: 103,
      content: `<p>주니어 개발자 관점에서 공유드립니다.</p>
      <p>저도 1년 전에 같은 고민을 했었어요. 실제로 해보니 다음과 같은 순서가 도움이 되었습니다:</p>
      <ol>
        <li>먼저 <strong>타입스크립트</strong>는 필수입니다. 단순히 타입을 추가하는 것이 아니라 제네릭, 유틸리티 타입 등 심화 내용까지 공부하세요.</li>
        <li>상태 관리 라이브러리는 <strong>Redux</strong>부터 시작했는데, 개념 이해가 중요합니다. 나중에 다른 라이브러리로 전환하더라도 기본 개념은 비슷해요.</li>
        <li><strong>API 연동과 비동기 처리</strong>는 꼭 깊게 공부하세요. 실무에서 가장 많이 쓰이는 부분이에요.</li>
      </ol>
      <p>그리고 꼭 사이드 프로젝트를 만들어보세요. 제가 처음 만든 사이드 프로젝트는 간단한 날씨 앱이었는데, 이 과정에서 API 연동, 상태 관리, 타입스크립트 활용 방법을 많이 배웠습니다.</p>
      <p>면접에서도 사이드 프로젝트 경험을 많이 물어보더라고요. 실제 코드를 볼 수 있으니 채용 담당자들이 좋아합니다!</p>`,
      author: {
        username: "코딩애플",
        avatarUrl: "https://mui.com/static/images/avatar/4.jpg",
      },
      createdAt: "2025-01-23T09:20:00Z",
      votes: 15,
      isAccepted: false,
    },
    {
      id: 104,
      content: `<p>조금 다른 관점에서 의견 드립니다.</p>
      <p>기술 스택도 중요하지만, 제 경험으로는 <strong>기본기</strong>가 더 중요합니다:</p>
      <ul>
        <li>자바스크립트 깊게 이해하기 (클로저, 프로토타입, 이벤트 루프 등)</li>
        <li>HTML/CSS 제대로 알기 (의외로 많은 개발자들이 여기서 부족함)</li>
        <li>웹 성능 최적화 방법 배우기</li>
        <li>접근성(a11y) 고려하는 방법 익히기</li>
      </ul>
      <p>프레임워크나 라이브러리는 계속 변하지만, 위의 기본기는 변하지 않습니다. 취업 후에도 지속적으로 성장하려면 기본기가 탄탄해야 해요.</p>
      <p>그리고 영어 공식 문서를 읽는 연습을 많이 하세요. 한글 번역본은 늦게 나오거나 없는 경우가 많아요. 개발자에게 영어 독해 능력은 필수입니다.</p>`,
      author: {
        username: "제로초",
        avatarUrl: "https://mui.com/static/images/avatar/5.jpg",
      },
      createdAt: "2025-01-23T11:35:00Z",
      votes: 18,
      isAccepted: false,
    },
  ],
};

// Custom theme colors
const themeColors = {
  primary: "#3B82F6", // Bright blue
  primaryLight: "#EFF6FF",
  primaryDark: "#1E40AF",
  secondary: "#6EE7B7", // Mint green
  secondaryLight: "#ECFDF5",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  borderLight: "#E2E8F0",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E", // Green
  downvote: "#EF4444", // Red
  tag: {
    bg: "#E0F2FE",
    text: "#0369A1",
  },
  accepted: "#059669", // Green for accepted answers
};

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setQuestion(mockQuestion);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  if (loading) {
    return (
      <PageContainer>
        <ComponentWrapper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress sx={{ color: themeColors.primary }} />
          </Box>
        </ComponentWrapper>
      </PageContainer>
    );
  }

  if (!question) {
    return (
      <PageContainer>
        <ComponentWrapper>
          <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h5">질문을 찾을 수 없습니다</Typography>
          </Box>
        </ComponentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ComponentWrapper>
        {/* Question Header */}
        <Box
          sx={{
            padding: "32px 0 24px",
            borderBottom: `1px solid ${themeColors.borderLight}`,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: themeColors.textPrimary,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {question.title}
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              color: themeColors.textSecondary,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">
                {formatDate(question.createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityIcon fontSize="small" />
              <Typography variant="body2">조회 {question.views}회</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Question Content */}
        <Box
          sx={{
            mt: 3,
          }}
        >
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Question Body */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: themeColors.background,
                border: `1px solid ${themeColors.borderLight}`,
                "& p": {
                  mb: 2,
                  color: themeColors.textPrimary,
                  lineHeight: 1.7,
                },
                "& ul, & ol": {
                  pl: 3,
                  mb: 2,
                  "& li": {
                    mb: 1,
                  },
                },
                "& strong": {
                  color: themeColors.primaryDark,
                  fontWeight: 600,
                },
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: question.content }} />

              {/* Tags */}
              <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {question.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: themeColors.tag.bg,
                      color: themeColors.tag.text,
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: "4px",
                      "&:hover": {
                        backgroundColor: alpha(themeColors.tag.bg, 0.7),
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Author Info */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: themeColors.surface,
                  borderRadius: 2,
                  border: `1px solid ${themeColors.borderLight}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  src={question.author.avatarUrl}
                  alt={question.author.username}
                  sx={{
                    width: 40,
                    height: 40,
                    border: `2px solid ${themeColors.primary}`,
                  }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: themeColors.textPrimary,
                    }}
                  >
                    {question.author.username}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: themeColors.textSecondary,
                      display: "block",
                    }}
                  >
                    작성자
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Answers Section Header */}
        <Box
          sx={{
            mt: 6,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: themeColors.textPrimary,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ChatBubbleOutlineIcon />
            {question.answers.length}개의 답변
          </Typography>

          <Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: themeColors.primary,
                color: themeColors.primary,
                "&:hover": {
                  borderColor: themeColors.primaryDark,
                  backgroundColor: alpha(themeColors.primary, 0.05),
                },
              }}
            >
              최신순
            </Button>
          </Box>
        </Box>

        {/* Answers */}
        {question.answers.map((answer) => (
          <Box
            key={answer.id}
            sx={{
              mb: 4,
              position: "relative",
              "&:last-child": {
                mb: 6,
              },
            }}
          >
            {answer.isAccepted && (
              <Box
                sx={{
                  position: "absolute",
                  top: -12,
                  right: 16,
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: alpha(themeColors.accepted, 0.1),
                  color: themeColors.accepted,
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 16,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: `1px solid ${alpha(themeColors.accepted, 0.3)}`,
                }}
              >
                <CheckCircleIcon fontSize="small" />
                채택된 답변
              </Box>
            )}

            <Box
              sx={{
                bgcolor: answer.isAccepted
                  ? alpha(themeColors.accepted, 0.03)
                  : "transparent",
                borderRadius: 2,
                p: { xs: 2, sm: 0 },
              }}
            >
              {/* Answer Content */}
              <Box sx={{ flex: 1 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: themeColors.background,
                    border: `1px solid ${
                      answer.isAccepted
                        ? alpha(themeColors.accepted, 0.5)
                        : themeColors.borderLight
                    }`,
                    boxShadow: answer.isAccepted
                      ? `0 0 0 1px ${alpha(themeColors.accepted, 0.1)}`
                      : "none",
                    "& p": {
                      mb: 2,
                      color: themeColors.textPrimary,
                      lineHeight: 1.7,
                    },
                    "& ul, & ol": {
                      pl: 3,
                      mb: 2,
                      "& li": {
                        mb: 1,
                      },
                    },
                    "& strong": {
                      color: themeColors.primaryDark,
                      fontWeight: 600,
                    },
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: answer.content }} />

                  {/* Voting - Now at the bottom of the answer card */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 1,
                      mt: 3,
                      pt: 2,
                      borderTop: `1px solid ${themeColors.borderLight}`,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: themeColors.textSecondary,
                        mr: 1,
                      }}
                    >
                      이 답변이 도움이 되었나요?
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        color: themeColors.textSecondary,
                        "&:hover": {
                          color: themeColors.upvote,
                          bgcolor: alpha(themeColors.upvote, 0.1),
                        },
                      }}
                    >
                      <ThumbUpOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: themeColors.textPrimary,
                        minWidth: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {answer.votes}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        color: themeColors.textSecondary,
                        "&:hover": {
                          color: themeColors.downvote,
                          bgcolor: alpha(themeColors.downvote, 0.1),
                        },
                      }}
                    >
                      <ThumbDownOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>

                {/* Author Info */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: themeColors.surface,
                      borderRadius: 2,
                      border: `1px solid ${themeColors.borderLight}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      src={answer.author.avatarUrl}
                      alt={answer.author.username}
                      sx={{
                        width: 40,
                        height: 40,
                        border: answer.isAccepted
                          ? `2px solid ${themeColors.accepted}`
                          : `2px solid ${themeColors.primary}`,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: themeColors.textPrimary,
                        }}
                      >
                        {answer.author.username}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: themeColors.textSecondary,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        {formatDate(answer.createdAt)}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        {/* Your Answer Section */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: themeColors.textPrimary,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CodeIcon />
            답변 작성하기
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 2,
              borderColor: themeColors.borderLight,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: themeColors.textSecondary,
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: themeColors.primaryLight,
                p: 2,
                borderRadius: 1,
              }}
            >
              <InfoIcon style={{ color: themeColors.primary }} />
              마크다운을 지원합니다. Ctrl+B로 굵게, Ctrl+I로 기울임체를 사용할
              수 있습니다.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                bgcolor: themeColors.primary,
                "&:hover": {
                  bgcolor: themeColors.primaryDark,
                },
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: `0 4px 14px ${alpha(themeColors.primary, 0.3)}`,
              }}
            >
              답변 등록
            </Button>
          </Paper>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default QuestionDetailPage;
