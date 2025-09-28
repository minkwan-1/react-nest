import { Box, Paper, Avatar, Typography } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useAtom } from "jotai";
// import { questionsAtom } from "@atom/question";
import { useFetchMyPublicInfo } from "@domains/my-info/hooks/useFetchMyInfo";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

const generateAvatarText = (name: string) => name.charAt(0).toUpperCase();

// type Question = {
//   id: number;
//   title: string;
//   content: string;
//   tags: string[];
//   createdAt: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//     phoneNumber: string;
//     createdAt: string;
//   };
//   userId: string;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailQuestionContent = ({ question }: any) => {
  // const { id } = useParams();
  // const [questions] = useAtom(questionsAtom);
  const contentRef = useRef<HTMLDivElement>(null);

  console.log(question);
  // const question = questions?.find(
  //   (q: Question) => q.id === parseInt(id || "0")
  // );

  const { data } = useFetchMyPublicInfo(question?.userId);

  const applyHighlighting = () => {
    const container = contentRef.current;
    if (!container) return;

    container.querySelectorAll("pre code").forEach((block) => {
      block.className = block.className.replace(/hljs[^ ]*/g, "");
    });

    container.querySelectorAll("pre.ql-syntax").forEach((pre) => {
      if (!pre.querySelector("code")) {
        const code = document.createElement("code");
        code.className = "language-javascript";
        code.textContent = pre.textContent || "";
        pre.textContent = "";
        pre.appendChild(code);
      }
    });

    container.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  };

  useEffect(() => {
    if (question?.content) {
      const timer = setTimeout(() => {
        applyHighlighting();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [question?.content]);

  if (!question) {
    return <Typography>질문을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        elevation={0}
        sx={{
          overflowX: "auto",
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",

          "& pre code": {
            backgroundColor: "#1e1e1e",
            color: "#dcdcdc",
            padding: "1rem",
            borderRadius: "8px",
          },
        }}
      >
        <div
          ref={contentRef}
          className="question-content"
          dangerouslySetInnerHTML={{ __html: question?.content }}
        />
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: "background.default",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              mr: 1,
              bgcolor: "b8dae1",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            src={data?.profileImageUrl || undefined}
          >
            {!data?.profileImageUrl && generateAvatarText(data?.nickname || "")}
          </Avatar>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {data?.nickname || "익명"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              작성자
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DetailQuestionContent;
