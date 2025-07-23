import { Box, IconButton, Button } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

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
  onCardClick?: (id: number | string) => void;
  questionUserId: string;
  userId: number | string;
}

const CardActionsSection = ({
  question,
  //   handleAnswerClick,
  questionUserId,
  // userId,
  onCardClick,
  handleDeleteClick,
}: CardActionsSectionProps) => {
  const navigate = useNavigate();
  const [user] = useAtom(realUserInfo);

  const isOwner = user?.id === questionUserId;

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
        onClick={() => onCardClick && onCardClick(question.id)}
      >
        확인하기
      </Button>

      <Box sx={{ flexGrow: 1 }} />
      {isOwner && (
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
      )}
    </Box>
  );
};

export default CardActionsSection;
