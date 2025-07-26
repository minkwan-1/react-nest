import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { MainContent } from "@components/home";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";

const HomePage = () => {
  const [userInfo] = useAtom(signupUserInfo);

  console.log("홈페이지에서 전역 상태(유저) 확인: ", userInfo);

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          padding: 3,
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          height: "calc(100vh - 80px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* 메인 컨텐츠 영역 */}
        <MainContent />
      </Box>

      {/* 글로벌 작성 버튼 (우측 하단에 고정) */}
      {/* <GlobalActionButton /> */}
    </PageContainer>
  );
};

export default HomePage;
