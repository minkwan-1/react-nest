import { Routes, Route, useLocation } from "react-router-dom";
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
import AuthRedirectModal from "@domains/common/modal/AuthRedirectModal";
import CommonErrorModal from "@domains/common/modal/CommonModal";
import { GlobalActionButton } from "@domains/home";
import Commonsnackbar from "@domains/common/snackbar/CommonSnackbar";

const App = () => {
  const location = useLocation();

  const hideOnExactPaths = ["/", "/start", "/phone", "/redirect", "/edit"];

  const shouldHide =
    hideOnExactPaths.includes(location.pathname) ||
    location.pathname.startsWith("/modify/");

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/my/edit" element={<MyInfoEditPage />} />
        <Route path="/edit" element={<QuestionEditPage />} />

        <Route path="/questions/:id" element={<QuestionDetailPage />} />
        <Route path="/modify/:id" element={<ModifyQuestionPage />} />

        <Route path="/start" element={<StartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/phone" element={<PhoneVerificationPage />} />
      </Routes>

      {!shouldHide && <GlobalActionButton />}

      <AuthRedirectModal />
      <CommonErrorModal />
      <Commonsnackbar />
    </>
  );
};

export default App;

// userInfo (x) => 라우팅 처리, 전역 상태가 null, 유저가 있어도 무조건 팅김
