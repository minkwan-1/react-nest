import { PageContainer, ComponentWrapper } from "../components/layout/common";
import UserProfile from "../components/my/UserProfile";
import { mockUser } from "../mock";

const MyPage = () => {
  return (
    <PageContainer>
      <ComponentWrapper>
        <UserProfile
          username={mockUser.username}
          avatarUrl={mockUser.avatarUrl}
          reputation={mockUser.reputation}
          badges={mockUser.badges}
          questionsAnswered={mockUser.questionsAnswered}
          questionsAsked={mockUser.questionsAsked}
          bio={mockUser.bio}
        />
      </ComponentWrapper>
    </PageContainer>
  );
};

export default MyPage;
