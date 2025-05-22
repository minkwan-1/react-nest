import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Avatar,
  Button,
  Paper,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import { InfoIcon } from "lucide-react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CodeIcon from "@mui/icons-material/Code";

// 샘플 데이터 (코드 스니펫 추가)
const sampleQuestion = {
  id: 1,
  title: "React에서 비동기 데이터 로딩 최적화하는 방법이 궁금합니다",
  content: `<p>안녕하세요, React로 개발 중인 프로젝트에서 API 호출 시 비동기 데이터 로딩을 최적화하는 방법이 궁금합니다.</p>
  <p>현재 다음과 같은 방식으로 구현하고 있는데, 더 효율적인 방법이 있을까요?</p>
  
  <pre><code class="language-javascript">
import { useState, useEffect } from 'react';

function DataLoader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {/* 데이터 표시 로직 */}
    </div>
  );
}
  </code></pre>
  
  <p>특히 여러 API를 동시에 호출해야 하는 경우나, 의존성이 있는 API 호출 시 최적화 방법이 궁금합니다.</p>`,
  tags: ["React", "JavaScript", "API", "비동기", "성능최적화"],
  author: {
    username: "이말년",
    avatarUrl:
      "https://i.namu.wiki/i/qGhidfEt7uEejAoCXRN6wRygLL4ePPRkfCdkP6HlhoGhSc6lfM4_Ys3EXO34w3vhO68qom1_XqSEaRkXDI02Sw.webp",
  },
  createdAt: "2025-03-23T10:30:00Z",
  votes: 12,
  views: 245,
  answers: [
    {
      id: 101,
      content: `<p>안녕하세요! 현직 프론트엔드 개발자입니다.</p>
      
      <p>비동기 데이터 로딩을 효율적으로 처리하는 몇 가지 방법을 공유해 드리겠습니다.</p>
      
      <p>먼저, React Query나 SWR 같은 데이터 페칭 라이브러리를 사용하는 것을 추천합니다. 이런 라이브러리들은 캐싱, 백그라운드 업데이트, 에러 핸들링 등을 내장하고 있어 코드를 간결하게 유지하면서도 성능을 최적화할 수 있습니다.</p>
      
      <p>React Query 예시:</p>
      
      <pre><code class="language-javascript">
import { useQuery } from 'react-query';

function DataLoader() {
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery('uniqueQueryKey', fetchData, {
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선하게 유지
    cacheTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    retry: 3, // 실패 시 3번까지 재시도
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {/* 데이터 표시 로직 */}
    </div>
  );
}
      </code></pre>
      
      <p>여러 API를 동시에 호출해야 하는 경우에는 Promise.all을 사용하거나, React Query의 useQueries를 활용할 수 있습니다:</p>
      
      <pre><code class="language-javascript">
import { useQueries } from 'react-query';

function MultipleDataLoader() {
  const results = useQueries([
    { queryKey: ['todos'], queryFn: fetchTodos },
    { queryKey: ['users'], queryFn: fetchUsers },
    { queryKey: ['posts'], queryFn: fetchPosts },
  ]);

  const isLoading = results.some(result => result.isLoading);
  const isError = results.some(result => result.isError);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div>
      {/* 모든 데이터 표시 */}
    </div>
  );
}
      </code></pre>
      
      <p>의존적인 쿼리의 경우에는 enabled 옵션을 활용하면 됩니다:</p>
      
      <pre><code class="language-javascript">
// 사용자 ID를 먼저 가져온 후, 해당 ID로 상세 정보를 조회
const { data: userId } = useQuery(['userId'], fetchUserId);
const { data: userDetails } = useQuery(
  ['userDetails', userId],
  () => fetchUserDetails(userId),
  { enabled: !!userId } // userId가 있을 때만 이 쿼리 실행
);
      </code></pre>
      
      <p>성능 최적화를 위한 추가 팁:</p>
      <ul>
        <li>데이터 변경이 적은 경우 <strong>cacheTime</strong>과 <strong>staleTime</strong>을 적절히 설정하여 네트워크 요청 최소화</li>
        <li>페이지네이션이나 무한 스크롤이 필요한 경우 <strong>useInfiniteQuery</strong> 활용</li>
        <li>대량의 데이터는 필요한 부분만 요청하도록 API 설계 (GraphQL 사용 고려)</li>
      </ul>`,
      author: {
        username: "침착맨",
        avatarUrl:
          "https://i.namu.wiki/i/9oIWpZPO2EO2pbE2nSwMocGV3RxiATFh07TDx7bZb6I3myioDNSk2GOzOjx8KgHhplg9-6d5zs_1NgRgUkb3jA.webp",
      },
      createdAt: "2025-01-22T14:15:00Z",
      votes: 20,
      isAccepted: false,
    },
  ],
};

// 테마 색상
const themeColors = {
  primary: "#3B82F6",
  primaryLight: "#EFF6FF",
  primaryDark: "#1E40AF",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  borderLight: "#E2E8F0",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E",
  downvote: "#EF4444",
  tag: {
    bg: "#E0F2FE",
    text: "#0369A1",
  },
  accepted: "#059669",
  code: {
    bg: "#F8F9FC",
    border: "#E5E7EB",
    text: "#374151",
  },
};
type Question = {
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
  answers: {
    id: number;
    content: string;
    author: {
      username: string;
      avatarUrl: string;
    };
    createdAt: string;
    votes: number;
    isAccepted: boolean;
  }[];
};

const MainContent = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    // API 호출 시뮬레이션
    const timer = setTimeout(() => {
      setQuestion(sampleQuestion);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  // 코드 하이라이팅 적용 부분의 타입 에러 해결
  useEffect(() => {
    // 코드 하이라이팅 적용
    if (!loading && question) {
      document.querySelectorAll("pre code").forEach((block) => {
        if (block && block.parentElement) {
          // parentElement가 존재하는지 확인
          block.parentElement.style.background = themeColors.code.bg;
          block.parentElement.style.border = `1px solid ${themeColors.code.border}`;
          block.parentElement.style.borderRadius = "6px";
          block.parentElement.style.padding = "16px";
          block.parentElement.style.overflow = "auto";
          block.parentElement.style.fontSize = "14px";
          block.parentElement.style.fontFamily = "monospace";
          block.parentElement.style.lineHeight = "1.5";
          block.parentElement.style.marginBottom = "16px";
          block.parentElement.style.marginTop = "10px";
        }
      });
    }
  }, [loading, question]);
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

  return (
    <Box
      sx={{
        flex: 1.5,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F1F1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: themeColors.primary }} />
        </Box>
      ) : !question ? (
        <Typography variant="h5" sx={{ py: 4 }}>
          질문을 찾을 수 없습니다
        </Typography>
      ) : (
        <>
          {/* 질문 헤더 */}
          <Box
            sx={{
              padding: "0 0 24px",
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

          {/* 질문 내용 */}
          <Box sx={{ mt: 3 }}>
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
                "& code": {
                  fontFamily: "monospace",
                  backgroundColor: alpha(themeColors.code.bg, 0.7),
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                },
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: question.content }} />

              {/* 태그 */}
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

            {/* 작성자 정보 */}
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

          {/* 답변 섹션 헤더 */}
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
                  borderColor: "#c5a3d5",
                  color: alpha(theme.palette.text.secondary, 0.7),
                  "&:hover": {
                    borderColor: "#c5a3d5",
                    backgroundColor: alpha(themeColors.primary, 0.05),
                  },
                }}
              >
                최신순
              </Button>
            </Box>
          </Box>

          {/* 답변 목록 */}
          {question.answers.map((answer) => (
            <Box
              key={answer.id}
              sx={{
                mb: 4,
                position: "relative",
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
                {/* 답변 내용 */}
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
                      "& p": {
                        mb: 2,
                        color: themeColors.textPrimary,
                        lineHeight: 1.7,
                      },
                      "& code": {
                        fontFamily: "monospace",
                        backgroundColor: alpha(themeColors.code.bg, 0.7),
                        padding: "2px 4px",
                        borderRadius: "4px",
                        fontSize: "0.9em",
                      },
                      "& ul, & ol": {
                        pl: 3,
                        mb: 2,
                        "& li": {
                          mb: 1,
                        },
                      },
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                  </Paper>

                  {/* 답변 작성자 정보 */}
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

          {/* 답변 작성 섹션 */}
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
              <CodeIcon sx={{ color: "#c5a3d5" }} /> {/* 아이콘 색상 변경 */}
              답변 작성하기
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                borderColor: "#e2f7f0", // 테두리 색상을 연한 청록색으로 변경
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
                  bgcolor: "#e2f7f0", // 배경색을 연한 청록색으로 변경
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <InfoIcon style={{ color: "#c5a3d5" }} />{" "}
                {/* 아이콘 색상 변경 */}
                마크다운을 지원합니다. Ctrl+B로 굵게, Ctrl+I로 기울임체를 사용할
                수 있습니다. 코드 블록은 ```로 감싸주세요.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: "#c5a3d5", // 버튼 배경색 변경
                  "&:hover": {
                    bgcolor: "#02b676", // 호버 시 약간 더 진한 청록색
                  },
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                답변 등록
              </Button>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MainContent;
