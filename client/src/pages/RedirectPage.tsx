// RedirectPage.tsx - 타입 안전성이 개선된 버전
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { signupUserInfo } from "@atom/auth";
import { useAtom } from "jotai";
import { usePostAuthorizationMutate } from "@api/auth/useAuthHooks";

interface ServerResponse {
  user?: {
    email?: string;
    name?: string;
  };
}

const RedirectPage = () => {
  const [data] = useState<ServerResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");
  const [, setUserInfo] = useAtom(signupUserInfo);

  const { mutate: authorizationMutate } = usePostAuthorizationMutate();

  console.log("1.Redirect Page Data:", data);
  console.log("2.Redirect Page Provider:", provider);
  console.log("3.Redirect Page Authorization Code:", code);

  useEffect(() => {
    const postFn = async () => {
      if (!provider || !code) {
        console.log("유효하지 않은 요청입니다.");
        console.log("인가 코드 없음");
        navigate("/error", {
          state: { message: "인가 코드가 제공되지 않았습니다." },
        });

        // toast: 소셜 회원가입 도중 오류
        // navigate("/sign-up");
        return;
      }
      if (loading) return;
      setLoading(true);

      authorizationMutate(
        { code, provider },
        {
          onSuccess: (res) => {
            console.log("성공 응답값: ", res);
            setUserInfo(res?.user);
            navigate("/phone");
            console.log("성공");
          },
          onError: () => {
            // toast
            console.log("실패");
          },
          onSettled: () => {
            console.log("settled");
            setLoading(false);
          },
        }
      );
    };
    postFn();

    // if (code) {
    //   postFn();
    // } else {
    //   console.log("인가 코드 없음");
    //   navigate("/error", {
    //     state: { message: "인가 코드가 제공되지 않았습니다." },
    //   });
    // }
  }, []);

  console.log("Redirect Page에 떨어지는 user data: ", data);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {loading ? <CircularProgress sx={{ color: "#03cb84" }} /> : null}
    </Box>
  );
};

export default RedirectPage;
