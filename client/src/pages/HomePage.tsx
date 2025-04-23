import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import {
  SectionDivider,
  MainContent,
  SideContent,
  GlobalActionButton,
} from "@components/home";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";
import { realUserInfo } from "@atom/auth";

const HomePage = () => {
  const [userInfo] = useAtom(signupUserInfo);
  const [realUser] = useAtom(realUserInfo);
  console.log("홈페이지에서 전역 상태(유저) 확인: ", userInfo);
  console.log("최종적으로 가입된 유저 정보(약식 로그인 성공): ", realUser);

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
        {/* 좌우 구분 디바이더 */}
        <SectionDivider />

        {/* 메인 컨텐츠 영역 */}
        <MainContent />

        {/* 사이드 컨텐츠 */}
        <SideContent />
      </Box>

      {/* 글로벌 작성 버튼 (우측 하단에 고정) */}
      <GlobalActionButton />
    </PageContainer>
  );
};

export default HomePage;
