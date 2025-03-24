import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
// import { signupUserInfo } from "@atom/auth";
// import { useAtom } from "jotai";

const RedirectPage = () => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");
  // const [userInfo, setUserInfo] = useAtom(signupUserInfo);
  // console.log(userInfo);

  console.log({ data, provider, code });

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

        // HTTP 응답이 실패한 경우 예외 발생
        if (!response.ok) {
          throw new Error(`서버 오류 발생: ${response.status}`);
        }

        const data = await response.json();

        // 서버 응답 데이터가 예상과 다를 경우 예외 발생
        if (!data || typeof data !== "object") {
          throw new Error("잘못된 응답 데이터 형식입니다.");
        }

        setData(data);
        // 이 데이터가  -> 전역
        navigate("/phone");
      } catch (err) {
        // 예외 발생 시 메시지 출력
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
      // 인가 코드가 없을 경우 예외 처리 추가
      throw new Error("인가 코드가 제공되지 않았습니다.");
    }
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
      {loading ? <CircularProgress /> : null}
    </Box>
  );
};

export default RedirectPage;
