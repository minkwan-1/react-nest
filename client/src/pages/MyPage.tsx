import { PageContainer } from "../components/layout/common";
import UserProfile from "../components/my/UserProfile";
import { mockUser } from "../mock";

const MyPage = () => {
  return (
    <PageContainer>
      <UserProfile
        username={mockUser.username}
        avatarUrl={mockUser.avatarUrl}
        reputation={mockUser.reputation}
        badges={mockUser.badges}
        questionsAnswered={mockUser.questionsAnswered}
        questionsAsked={mockUser.questionsAsked}
        bio={mockUser.bio}
      />
    </PageContainer>
  );
};

export default MyPage;
