import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import { PageContainer } from "@components/layout/common";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";

const questionData = [
  {
    id: 1,
    title: "React의 useEffect 훅을 어떻게 사용할까요?",
    author: "김민수",
    date: "2025-01-23",
    content:
      "React에서 useEffect를 사용하여 데이터를 fetching하려면 어떻게 해야 할까요? useEffect의 기본적인 사용법을 알고 싶습니다.",
  },
  {
    id: 2,
    title: "자바스크립트의 비동기 처리 이해하기",
    author: "이정민",
    date: "2025-01-22",
    content:
      "자바스크립트에서 비동기 처리 방식인 Promise와 async/await의 차이점에 대해 자세히 알고 싶습니다.",
  },
  {
    id: 3,
    title: "React에서 상태 관리 라이브러리 선택",
    author: "박수진",
    date: "2025-01-21",
    content:
      "리액트에서 상태 관리를 위해 Redux, MobX, Recoil 등 여러 라이브러리 중 무엇을 선택해야 할지 고민입니다. 각 라이브러리의 특징과 장단점을 알고 싶어요.",
  },
  {
    id: 4,
    title: "자바스크립트 클로저(Closure) 사용법",
    author: "최수영",
    date: "2025-01-20",
    content:
      "자바스크립트에서 클로저(Closure) 개념을 잘 이해하고 싶습니다. 예시를 들어 설명 부탁드립니다.",
  },
  {
    id: 5,
    title: "React 컴포넌트 간 데이터 전달 방법",
    author: "정서연",
    date: "2025-01-19",
    content:
      "React에서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법과 그 반대로 데이터를 전달하는 방법을 알고 싶습니다.",
  },
  {
    id: 6,
    title: "CSS Flexbox와 Grid 차이점",
    author: "김하늘",
    date: "2025-01-18",
    content:
      "CSS에서 Flexbox와 Grid의 차이점이 무엇인가요? 각각의 사용 사례와 장단점을 알려주세요.",
  },
  {
    id: 7,
    title: "Node.js에서 비동기 함수 호출 순서",
    author: "이유진",
    date: "2025-01-17",
    content:
      "Node.js에서 비동기 함수가 호출되는 순서가 궁금합니다. 콜백 함수나 Promise의 실행 순서에 대해 설명해주세요.",
  },
  {
    id: 8,
    title: "TypeScript 제네릭 사용법 이해하기",
    author: "한지민",
    date: "2025-01-16",
    content:
      "TypeScript에서 제네릭을 효과적으로 사용하는 방법이 궁금합니다. 복잡한 타입을 다루는 실전 예제와 함께 설명해주세요.",
  },
  {
    id: 9,
    title: "React Native와 Flutter 비교",
    author: "송태양",
    date: "2025-01-15",
    content:
      "크로스 플랫폼 앱 개발을 위해 React Native와 Flutter 중 어떤 것을 선택해야 할지 고민입니다. 성능, 개발 편의성, 생태계 측면에서 비교 분석해주세요.",
  },
  {
    id: 10,
    title: "웹 성능 최적화 방법",
    author: "임성민",
    date: "2025-01-14",
    content:
      "대규모 웹 애플리케이션의 성능을 최적화하는 다양한 방법과 전략에 대해 알고 싶습니다. 로딩 시간 단축, 렌더링 최적화 등의 기법을 알려주세요.",
  },
  {
    id: 11,
    title: "GraphQL과 REST API 차이점",
    author: "정현우",
    date: "2025-01-13",
    content:
      "백엔드 API 개발 시 GraphQL과 REST API의 주요 차이점과 각각의 장단점에 대해 알고 싶습니다. 어떤 상황에서 어떤 방식을 선택해야 할까요?",
  },
  {
    id: 12,
    title: "Docker와 Kubernetes 입문 방법",
    author: "강민준",
    date: "2025-01-12",
    content:
      "컨테이너화와 오케스트레이션 기술인 Docker와 Kubernetes를 처음 배우려고 합니다. 효과적인 학습 로드맵과 추천 자료를 공유해주세요.",
  },
  {
    id: 13,
    title: "NextJS와 Gatsby 비교",
    author: "이동현",
    date: "2025-01-11",
    content:
      "React 기반 프레임워크인 NextJS와 Gatsby 중 어떤 것을 사용해야 할지 고민입니다. SSR, SSG, ISR 등 다양한 렌더링 방식의 차이점과 적합한 사용 사례를 설명해주세요.",
  },
  {
    id: 14,
    title: "프론트엔드 상태 관리 패턴",
    author: "오지현",
    date: "2025-01-10",
    content:
      "프론트엔드 애플리케이션에서 효과적인 상태 관리를 위한 다양한 패턴과 접근 방식에 대해 알고 싶습니다. Flux, MVC, MVVM 등의 패턴을 비교해주세요.",
  },
  {
    id: 15,
    title: "자바스크립트 성능 최적화 기법",
    author: "윤서진",
    date: "2025-01-09",
    content:
      "대규모 자바스크립트 애플리케이션의 성능을 최적화하는 방법에 대해 알고 싶습니다. 메모리 관리, 알고리즘 개선, 비동기 처리 최적화 등의 기법을 설명해주세요.",
  },
];

// 추천 토픽 데이터
const recommendedTopics = [
  "데이터 과학",
  "자기 계발",
  "정치",
  "관계",
  "암호화폐",
  "생산성",
];

// 스태프 추천 데이터
const staffPicks = [
  {
    id: 1,
    author: "김주희",
    title: "개발자의 시선: 우리에게 필요한 증명",
    date: "3월 11일",
  },
  {
    id: 2,
    author: "박재민",
    title: "코드 리뷰를 통한 팀 문화 개선 방법",
    date: "6일 전",
  },
  {
    id: 3,
    author: "이세영",
    title: "게임 이론으로 알아보는 프로그래밍 패턴",
    date: "2월 8일",
  },
];

const HomePage = () => {
  const [userInfo] = useAtom(signupUserInfo);
  console.log(userInfo);

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          padding: 3,
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          height: "calc(100vh - 64px)", // Appbar 높이 고려
          overflow: "hidden", // 전체 영역은 오버플로우 숨김
          position: "relative", // 디바이더 위치 기준점
        }}
      >
        {/* 좌우 구분 디바이더 */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "66.67%", // 2:1 비율 고려
            width: "1px",
            height: "100vh",
            bgcolor: "#E6E6E6",
            zIndex: 1,
          }}
        />

        {/* 메인 컨텐츠 영역 - 스크롤 가능 */}
        <Box
          sx={{
            flex: 2,
            pr: 4,
            overflowY: "auto", // Y축 스크롤만 가능하도록
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: 3,
              color: "text.primary",
            }}
          >
            질문 및 답변
          </Typography>

          {/* 검색바 */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
            <TextField
              variant="outlined"
              placeholder="원하는 주제를 찾아보세요"
              sx={{
                flexGrow: 1,
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#03cb84",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#03cb84",
                  },
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#03cb84",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#028a61" },
              }}
            >
              검색
            </Button>
          </Box>

          {/* 필터 버튼들 - Medium 스타일로 조정 */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
            <Button
              sx={{
                color: "gray",
                border: "1px solid #E6E6E6",
                borderRadius: 4,
                textTransform: "none",
                px: 2,
              }}
              startIcon={<SortIcon />}
            >
              최신순
            </Button>
            <Button
              sx={{
                color: "gray",
                border: "1px solid #E6E6E6",
                borderRadius: 4,
                textTransform: "none",
                px: 2,
              }}
              startIcon={<SortIcon />}
            >
              추천순
            </Button>
            <Button
              sx={{
                color: "gray",
                border: "1px solid #E6E6E6",
                borderRadius: 4,
                textTransform: "none",
                px: 2,
              }}
              startIcon={<SortIcon />}
            >
              답변순
            </Button>
          </Box>

          {/* 질문 카드들 - Medium 스타일로 수정 */}
          {questionData.map((question) => (
            <Box
              key={question.id}
              sx={{
                borderBottom: "1px solid #E6E6E6",
                pb: 3,
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                  {question.author.charAt(0)}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {question.author}
                </Typography>
                <Typography variant="body2" sx={{ mx: 1, color: "#757575" }}>
                  •
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575" }}>
                  {question.date}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                  color: "text.primary",
                  fontFamily: "serif",
                }}
              >
                {question.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#292929", marginBottom: 2 }}
              >
                {question.content}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  size="small"
                  sx={{
                    color: "#03cb84",
                    fontWeight: "medium",
                    textTransform: "none",
                    "&:hover": { color: "#028a61" },
                    pl: 0,
                  }}
                >
                  답변하기
                </Button>
                <Button
                  size="small"
                  sx={{
                    color: "#03cb84",
                    fontWeight: "medium",
                    textTransform: "none",
                    "&:hover": { color: "#028a61" },
                  }}
                >
                  관심
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* 사이드바 (Medium 스타일) - 고정됨 */}
        <Box
          sx={{
            flex: 1,
            pl: 3,
            position: "sticky",
            alignSelf: "flex-start",
          }}
        >
          <Box sx={{ mb: 4, paddingLeft: "20px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Staff Picks
            </Typography>
            {staffPicks.map((pick) => (
              <Box key={pick.id} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ width: 20, height: 20, mr: 1 }}>
                    {pick.author.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">{pick.author}</Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 0.5, lineHeight: 1.3 }}
                >
                  {pick.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575" }}>
                  {pick.date}
                </Typography>
              </Box>
            ))}
            <Button sx={{ textTransform: "none", color: "#757575" }}>
              더 보기
            </Button>
          </Box>

          <Box sx={{ paddingLeft: "20px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              추천 토픽
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {recommendedTopics.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  sx={{
                    borderRadius: 4,
                    bgcolor: "#F2F2F2",
                    color: "#292929",
                    mb: 1,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default HomePage;
