import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAtom } from "jotai";
import { signupUserInfo, realUserInfo } from "@atom/auth";
import { usePostAuthorizationMutate } from "@api/auth/useAuthHooks";
import { useOpenCommonModal } from "@components/common/modal/hook/useOpenCommonModal";

const RedirectPage = () => {
  const [loading, setLoading] = useState(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");

  const [, setUserInfo] = useAtom(signupUserInfo);
  const [, setRealUserInfo] = useAtom(realUserInfo);
  const { mutate: authorizationMutate } = usePostAuthorizationMutate();
  const { openModal } = useOpenCommonModal();
  // const { mutateAsync: signinAsyncMutate } = useSigninMutate();

  useEffect(() => {
    // 유효성 검사
    if (!provider || !code) {
      console.log("유효하지 않은 요청: 인가 코드 없음");
      navigate("/error", {
        state: { message: "인가 코드가 제공되지 않았습니다." },
      });
      return;
    }

    // 중복 요청 방지
    if (loading) return;
    setLoading(true);

    // 인가 코드 전달 및 사용자 정보 설정
    authorizationMutate(
      { code, provider },
      {
        onSuccess: async (res) => {
          const user = res?.user;

          if (!user) {
            console.log("사용자 정보 없음");
            navigate("/error", {
              state: { message: "사용자 정보를 가져오지 못했습니다." },
            });
            return;
          }

          // 사용자 존재 여부에 따라 라우팅
          if (!user.isExist) {
            setUserInfo({ ...user, provider });
            navigate("/phone");
          } else {
            // const result = await signinAsyncMutate({ ...user });
            setRealUserInfo({ ...user });
            navigate("/home");
          }

          console.log("인가 성공");
        },
        onError: (err) => {
          console.error("인가 요청 실패:", err);
          openModal({
            isOpen: true,
            type: "error",
            title: "오류",
            info: "서버로부터 토큰을 받아오지 못했습니다.",
            navigateTo: "/start",
          });
        },
        onSettled: () => {
          console.log("인가 요청 완료");
          setLoading(false);
        },
      }
    );
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {loading && <CircularProgress sx={{ color: "#b8dae1" }} />}
    </Box>
  );
};

export default RedirectPage;
