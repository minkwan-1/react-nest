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
import AuthRedirectModal from "@components/common/modal/AuthRedirectModal";
import CommonErrorModal from "@components/common/modal/CommonModal";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { GlobalActionButton } from "@components/home";
import Commonsnackbar from "@components/common/snackbar/CommonSnackbar";

const App = () => {
  const [realUser] = useAtom(realUserInfo);
  const location = useLocation();

  const hideOnExactPaths = ["/", "/start", "/phone", "/redirect", "/edit"];

  const shouldHide =
    hideOnExactPaths.includes(location.pathname) ||
    location.pathname.startsWith("/modify/");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={realUser ? <NotFoundPage /> : <LandingPage />}
        />
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
