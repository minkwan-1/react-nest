import { Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TitleAndExcerptProps {
  questionId: number | string;
  questionTitle: string;
  questionContent: string;
}

const TitleAndExcerpt = ({
  questionId,
  questionTitle,
  questionContent,
}: TitleAndExcerptProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleTitleClick = (questionId: number | string) => {
    navigate(`/questions/${questionId}`);
  };

  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const getExcerpt = (content: string, maxLength: number = 100): string => {
    const plainText = stripHtml(content);
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 1.5,
          fontSize: "18px",
          lineHeight: 1.4,
          cursor: "pointer",
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => handleTitleClick(questionId)}
      >
        {questionTitle}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          mb: 2.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {getExcerpt(questionContent, 100)}
      </Typography>
    </>
  );
};

export default TitleAndExcerpt;
