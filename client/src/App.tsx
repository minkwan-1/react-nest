import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  HomePage,
  QuestionListPage,
  TagListPage,
  MyPage,
  PhoneVerificationPage,
  NotFoundPage,
  TermsAndPrivacyPage,
  QuestionEditPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/question" element={<QuestionListPage />} />
      <Route path="/tag" element={<TagListPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/privacy" element={<TermsAndPrivacyPage />} />
      <Route path="/edit" element={<QuestionEditPage />} />
    </Routes>
  );
};

export default App;
