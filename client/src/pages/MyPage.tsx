import { PageContainer } from "../domains/layout/common";
import UserProfile from "../domains/my/UserProfile";
import { useFetchMeQuery } from "@domains/auth/api/useAuthHooks";
import { CircularProgress } from "@mui/material";

const MyPage = () => {
  const { data, isLoading } = useFetchMeQuery();
  console.log("44444444444444444444444444444444444444", isLoading);
  return (
    <PageContainer>
      {isLoading ? (
        <CircularProgress sx={{ color: "#b8dae1" }} />
      ) : data?.user ? (
        <UserProfile />
      ) : (
        <h1>접근 불가</h1>
      )}
    </PageContainer>
  );
};

export default MyPage;
