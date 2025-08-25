import { PageContainer } from "../domains/layout/common";
// import { AuthenticatedWrapper } from "../providers";
import UserProfile from "../domains/my/UserProfile";

const MyPage = () => {
  return (
    <PageContainer>
      <UserProfile />
    </PageContainer>
  );
};

export default MyPage;
