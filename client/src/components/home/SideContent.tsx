import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";
import {
  StaffPicks,
  TrendingTopics,
  GetAnswers,
  PopularTagsSection,
} from "@components/home/index";

const SideContent = () => {
  const navigate = useNavigate();
  const [userInfo] = useAtom(signupUserInfo);

  const handleClick = () => {
    if (!userInfo) {
      navigate("/sign-up");
    } else {
      console.log("edit으로");
    }
  };
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        flex: 1,
        pl: 6,
        position: "sticky",
        alignSelf: "flex-start",
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
      }}
    >
      {/* 스태프 추천 섹션 */}
      <StaffPicks />

      {/* 추천 토픽 섹션 */}
      <TrendingTopics />

      {/* 새로운 섹션: 질문하기 */}
      <GetAnswers handleClick={handleClick} />

      {/* 인기 태그 섹션 */}
      <PopularTagsSection />
    </Box>
  );
};

export default SideContent;
