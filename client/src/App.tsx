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
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/question" element={<QuestionListPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/privacy" element={<TermsAndPrivacyPage />} />
      <Route path="/edit" element={<QuestionEditPage />} />
    </Routes>
  );
};

export default App;
