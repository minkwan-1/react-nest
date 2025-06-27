import { Box, IconButton, Button } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt?: string | Date;
}

interface CardActionsSectionProps {
  question: Question;
  handleAnswerClick: (questionId: number | string) => void;
  handleDeleteClick: () => void;
}

const CardActionsSection = ({
  question,
  handleAnswerClick,
  handleDeleteClick,
}: CardActionsSectionProps) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        size="small"
        sx={{
          color: "#b8dae1",
          fontWeight: 500,
          textTransform: "none",
          "&:hover": {
            color: "#02a770",
            backgroundColor: "rgba(3, 203, 132, 0.05)",
          },
          pl: 0,
          borderRadius: 6,
        }}
        startIcon={<CommentOutlinedIcon sx={{ fontSize: 18 }} />}
        onClick={() => handleAnswerClick(question.id)}
      >
        답변하기
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          size="small"
          aria-label="삭제"
          sx={{ color: "#757575" }}
          onClick={handleDeleteClick}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          aria-label="수정"
          sx={{ color: "#757575" }}
          onClick={() => {
            navigate(`/modify/${question.id}`);
          }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardActionsSection;
