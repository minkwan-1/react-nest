import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const [data, setData] = useState(null); // 데이터 타입을 명확히 하려면 타입을 지정하세요.
  const [query] = useSearchParams();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const code = query.get("code");

  useEffect(() => {
    const postFn = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/kakao/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }).then((res) => res.json());

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
      // 코드가 없을 때 다른 페이지로 리디렉션 (필요하면 활성화)
      // navigate("/some-other-page");
    }
  }, [code, navigate]); // navigate를 의존성 배열에 추가

  console.log({ code, data });
  return <div>redirect 용 페이지</div>;
};

export default RedirectPage;
