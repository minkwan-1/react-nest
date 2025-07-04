import { Typography } from "@mui/material";

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt?: string | Date;
}

interface CardContentSectionProps {
  question: Question;
  handleTitleClick: (questionId: number | string) => void;
}

const CardContentSection = ({
  question,
  handleTitleClick,
}: CardContentSectionProps) => {
  return (
    <Typography
      variant="h6"
      sx={{
        border: "1px solid red",
        fontWeight: "bold",
        mb: 1.5,
        fontSize: "18px",
        lineHeight: 1.4,
        cursor: "pointer",
        "&:hover": { textDecoration: "underline" },
      }}
      onClick={() => handleTitleClick(question.id)}
    >
      {question.title}
    </Typography>
  );
};

export default CardContentSection;
