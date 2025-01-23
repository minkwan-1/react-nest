import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

const collectionData = [
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
];

const CollectionPage = () => {
  const [filter, setFilter] = useState("");

  // 이벤트 타입을 SelectChangeEvent로 변경
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ padding: 2 }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          관심 등록한 질문
        </Typography>

        {/* 필터 드롭박스 */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <FormControl fullWidth>
            <InputLabel>필터</InputLabel>
            <Select
              value={filter}
              label="필터"
              onChange={handleFilterChange}
              sx={{
                flexGrow: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#03cb84",
                  },
                  "&:hover fieldset": {
                    borderColor: "#03cb84",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#03cb84",
                  },
                },
                "& .MuiSelect-icon": {
                  color: "#03cb84",
                },
              }}
            >
              <MenuItem value="latest">최신순</MenuItem>
              <MenuItem value="popular">인기순</MenuItem>
              <MenuItem value="answered">답변순</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 관심 등록된 질문 카드들 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {collectionData.map((question) => (
            <Box key={question.id}>
              <Card
                sx={{ width: "100%", display: "flex", flexDirection: "column" }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {question.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginBottom: 2 }}
                  >
                    {question.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "14px" }}
                  >
                    작성자: {question.author} | 작성일: {question.date}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-start", padding: 2 }}>
                  <Button size="small" sx={{ color: "#03cb84" }}>
                    답변하기
                  </Button>
                  <Button size="small" sx={{ color: "#03cb84" }}>
                    관심 취소
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default CollectionPage;
