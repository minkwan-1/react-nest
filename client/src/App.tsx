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
import AuthRedirectModal from "@domains/common/modal/AuthRedirectModal";
import CommonErrorModal from "@domains/common/modal/CommonModal";
import { GlobalActionButton } from "@domains/home";
import Commonsnackbar from "@domains/common/snackbar/CommonSnackbar";
import { useShouldHide } from "./hooks/common/useShouldHide";
import { AuthenticatedWrapper } from "../src/providers";

const App = () => {
  const shouldHide = useShouldHide();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/edit" element={<QuestionEditPage />} />
        <Route
          path="/my"
          element={
            <AuthenticatedWrapper>
              <MyPage />
            </AuthenticatedWrapper>
          }
        />
        <Route
          path="/my/edit"
          element={
            <AuthenticatedWrapper>
              <MyInfoEditPage />
            </AuthenticatedWrapper>
          }
        />
        <Route
          path="/modify/:id"
          element={
            <AuthenticatedWrapper>
              <ModifyQuestionPage />
            </AuthenticatedWrapper>
          }
        />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />

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
