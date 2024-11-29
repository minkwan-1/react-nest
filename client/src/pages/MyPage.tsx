import { PageContainer, ComponentWrapper } from "../components/layout/common";
import UserProfile from "../components/my/UserProfile";

const MyPage = () => {
  const user = {
    username: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    reputation: 1234,
    badges: ["Gold Badge", "Silver Badge", "Bronze Badge"],
    questionsAnswered: 20,
    questionsAsked: 15,
    bio: "A passionate developer with expertise in React and TypeScript.",
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <UserProfile
          username={user.username}
          avatarUrl={user.avatarUrl}
          reputation={user.reputation}
          badges={user.badges}
          questionsAnswered={user.questionsAnswered}
          questionsAsked={user.questionsAsked}
          bio={user.bio}
        />
      </ComponentWrapper>
    </PageContainer>
  );
};

export default MyPage;
