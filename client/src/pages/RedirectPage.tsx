import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAtom } from "jotai";
import { signupUserInfo, realUserInfo } from "@atom/auth";
import { usePostAuthorizationMutate } from "@domains/auth/api/useAuthHooks";
import { useOpenCommonModal } from "@domains/common/modal/hook/useOpenCommonModal";

const RedirectPage = () => {
  const [loading, setLoading] = useState(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");
  const state = query.get("state");

  const [, setUserInfo] = useAtom(signupUserInfo);
  const [, setRealUserInfo] = useAtom(realUserInfo);
  const { mutate: authorizationMutate } = usePostAuthorizationMutate();
  const { openModal } = useOpenCommonModal();

  useEffect(() => {
    if (!provider || !code) {
      navigate("/error", {
        state: { message: "인가 코드가 제공되지 않았습니다." },
      });
      return;
    }

    if (loading) return;
    setLoading(true);

    authorizationMutate(
      { code, provider, state },
      {
        onSuccess: async (res) => {
          const user = res?.user;

          if (!user) {
            navigate("/error", {
              state: { message: "사용자 정보를 가져오지 못했습니다." },
            });
            return;
          }

          if (!user.isExist) {
            setUserInfo({ ...user, provider });
            navigate("/phone");
          } else {
            setRealUserInfo({ ...user });
            navigate("/home");
          }
        },
        onError: (err: Error) => {
          openModal({
            isOpen: true,
            type: "error",
            title: "오류",
            info: err.message,
            navigateTo: "/start",
          });
        },
        onSettled: () => {
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
