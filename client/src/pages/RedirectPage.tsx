// RedirectPage.tsx - 타입 안전성이 개선된 버전
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { signupUserInfo, UserInfo } from "@atom/auth";
import { useAtom } from "jotai";

interface ServerResponse {
  user?: {
    email?: string;
    name?: string;
  };
}

const RedirectPage = () => {
  const [data, setData] = useState<ServerResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");
  const [, setUserInfo] = useAtom(signupUserInfo);

  console.log("1.Redirect Page Data:", data);
  console.log("2.Redirect Page Provider:", provider);
  console.log("3.Redirect Page Authorization Code:", code);

  useEffect(() => {
    const postFn = async () => {
      if (!provider || !code) {
        console.log("유효하지 않은 요청입니다.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3000/auth/${provider}/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          throw new Error(`서버 오류 발생: ${response.status}`);
        }

        const responseData: ServerResponse = await response.json();

        if (!responseData || typeof responseData !== "object") {
          throw new Error("잘못된 응답 데이터 형식입니다.");
        }

        setData(responseData);

        if (responseData.user) {
          const newUserInfo: UserInfo = {
            email: responseData.user.email || "",
            name: responseData.user.name || "",
          };

          // Update Jotai state
          setUserInfo(newUserInfo);

          // Also store in localStorage for persistence
          localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
        }

        navigate("/phone");
      } catch (err) {
        console.error(
          "Error during fetch:",
          err instanceof Error ? err.message : "알 수 없는 오류 발생"
        );
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      postFn();
    } else {
      console.log("인가 코드 없음");
      navigate("/error", {
        state: { message: "인가 코드가 제공되지 않았습니다." },
      });
    }
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
