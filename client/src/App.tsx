import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MyPage,
  PhoneVerificationPage,
  NotFoundPage,
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
      {/* 화 */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      {/* 수 */}
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* 목 */}
      <Route path="/my" element={<MyPage />} />
      <Route path="/my/edit" element={<MyInfoEditPage />} />
      {/* 금 */}
      <Route path="/edit" element={<QuestionEditPage />} />
      <Route path="/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/modify/:id" element={<ModifyQuestionPage />} />
    </Routes>
  );
};

export default App;
