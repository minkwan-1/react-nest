import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MyPage,
  PhoneVerificationPage,
  NotFoundPage,
  TermsAndPrivacyPage,
  QuestionEditPage,
  // TestPage,
  QuestionDetailPage,
  RedirectPage,
  LandingPage,
  CommunityPage,
  TagPage,
  AskAIPage,
  SignUpPage,
  SignInPage,
  TestPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/question" element={<QuestionListPage />} /> */}
      <Route path="/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/my" element={<MyPage />} />
      {/* <Route path="/auth" element={<AuthPage />} /> */}
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/privacy" element={<TermsAndPrivacyPage />} />
      <Route path="/edit" element={<QuestionEditPage />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* <Route path="/test" element={<TestPage />} /> */}
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="/community" element={<CommunityPage />} />
      {/* <Route path="/collection" element={<CollectionPage />} /> */}
      <Route path="/tag" element={<TagPage />} />
      <Route path="/ask-ai" element={<AskAIPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App;
