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
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/my/edit" element={<MyInfoEditPage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/phone" element={<PhoneVerificationPage />} />
      <Route path="/edit" element={<QuestionEditPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/modify/:id" element={<ModifyQuestionPage />} />
    </Routes>
  );
};

export default App;
