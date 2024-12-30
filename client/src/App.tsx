import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  QuestionListPage,
  MyPage,
  AuthPage,
  PhoneVerificationPage,
  NotFoundPage,
  TermsAndPrivacyPage,
  QuestionEditPage,
  TestPage,
  QuestionDetailPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/question" element={<QuestionListPage />} />
      <Route path="/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/privacy" element={<TermsAndPrivacyPage />} />
      <Route path="/edit" element={<QuestionEditPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App;
