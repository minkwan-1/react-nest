import { Box, Paper, Avatar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { useFetchMyPublicInfo } from "@domains/my-info/hooks/useFetchMyInfo";

const generateAvatarText = (name: string) => name.charAt(0).toUpperCase();

type Question = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
  userId: string;
};

const DetailQuestionContent = () => {
  const { id } = useParams();
  const [questions] = useAtom(questionsAtom);

  const question = questions?.find(
    (q: Question) => q.id === parseInt(id || "0")
  );

  const { data } = useFetchMyPublicInfo(question?.user.id);

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

          "& .question-content p": {
            mb: 2,
            color: "text.primary",
            lineHeight: 1.7,
          },
          "& .question-content ul, & .question-content ol": {
            pl: 3,
            mb: 2,
            "& li": {
              mb: 1,
            },
          },
          "& .question-content strong": {
            color: "primary.dark",
            fontWeight: 600,
          },
          "& .question-content code": {
            fontFamily: "monospace",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.100",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
          },

          "& .question-content img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            my: 1,
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <div
          className="question-content"
          dangerouslySetInnerHTML={{ __html: question.content }}
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
