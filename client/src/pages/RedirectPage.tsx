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
    isExist?: boolean;
    registrationComplete?: boolean;
  };
}

const RedirectPage = () => {
  const [data] = useState<ServerResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);

  const { mutate: authorizationMutate } = usePostAuthorizationMutate();

  console.log("1.Redirect Page Data:", data);
  console.log("2.Redirect Page Provider:", provider);
  console.log("3.Redirect Page Authorization Code:", code);
  console.log("#SMS 인증 직전 유저 정보: ", userInfo);

  useEffect(() => {
    const postFn = async () => {
      if (!provider || !code) {
        console.log("유효하지 않은 요청입니다.");
        console.log("인가 코드 없음");
        navigate("/error", {
          state: { message: "인가 코드가 제공되지 않았습니다." },
        });
        return;
      }

      if (loading) return;
      setLoading(true);

      authorizationMutate(
        { code, provider },
        {
          onSuccess: (res) => {
            console.log("성공 응답값: ", res);
            // setUserInfo(res?.user);
            setUserInfo({ ...res?.user, provider });

            // 새 사용자이거나 이미 존재하지만 가입이 미완료된 경우
            if (!res?.user?.isExist) {
              navigate("/phone");
            }
            // 가입이 완료된 기존 사용자
            else {
              navigate("/home");
            }

            console.log("성공");
          },
          onError: () => {
            // toast
            console.log("실패");
            alert("get token 알럿");
          },
          onSettled: () => {
            console.log("settled");
            setLoading(false);
          },
        }
      );
    };
    postFn();
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
      {loading ? <CircularProgress sx={{ color: "#b8dae1" }} /> : null}
    </Box>
  );
};

export default RedirectPage;
