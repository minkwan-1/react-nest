import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const [data, setData] = useState(null);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("state");

  console.log({ data, provider, code });

  console.log("ㅍ프프프프프프프류ㅗ로로로바바바이ㅣ이이이더:", provider);

  useEffect(() => {
    const postFn = async () => {
      if (!provider || !code) {
        console.log("유효하지 않은 요청입니다.");
        return;
      }

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

        // 요청 성공 시 /phone 페이지로 이동
        navigate("/phone");
      } catch (err) {
        console.error("Error during fetch:", err);
      }
    };

    if (code) {
      postFn();
    } else {
      console.log("인가 코드 없음");
      // navigate("/some-other-page");
    }
  }, [code, navigate, provider]);

  return <div>redirect 용 페이지</div>;
};

export default RedirectPage;
