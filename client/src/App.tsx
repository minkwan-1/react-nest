import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MyPage,
  PhoneVerificationPage,
  NotFoundPage,
  TermsAndPrivacyPage,
  QuestionEditPage,
  QuestionDetailPage,
  RedirectPage,
  LandingPage,
  StartPage,
  ModifyQuestionPage,
  MyInfoEditPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/edit" element={<QuestionEditPage />} />
      <Route path="/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/privacy" element={<TermsAndPrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/modify/:id" element={<ModifyQuestionPage />} />
      <Route path="/my/edit" element={<MyInfoEditPage />} />
    </Routes>
  );
};

export default App;
