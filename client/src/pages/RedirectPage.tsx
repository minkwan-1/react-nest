import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const RedirectPage = () => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");

  console.log({ data, provider, code });

  useEffect(() => {
    const postFn = async () => {
      if (!provider || !code) {
        console.log("유효하지 않은 요청입니다.");
        return;
      }

      setLoading(true); // 로딩 시작

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
        ).then((res) => res.json());

        setData(response);
        navigate("/phone"); // 데이터 로딩 후 /phone 페이지로 이동
      } catch (err) {
        console.error("Error during fetch:", err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    if (code) {
      postFn();
    } else {
      console.log("인가 코드 없음");
      // navigate("/some-other-page");
    }
  }, [code, navigate, provider]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {loading ? <CircularProgress /> : <></>}
    </Box>
  );
};

export default RedirectPage;
