import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const RedirectPage = () => {
  const [data, setData] = useState();
  const [query] = useSearchParams();
  const code = query.get("code");

  useEffect(() => {
    const postFn = async () => {
      const response = await fetch("http://localhost:3000/auth/kakao/user", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ code }),
      }).then((res) => res.json());

      setData(response);
    };
    if (code) {
      try {
        postFn();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("인가 코드 없음");
      // 다른 페이지
    }
  }, []);

  console.log({ code, data });
  return <div>redirect 용 페이지</div>;
};

export default RedirectPage;
