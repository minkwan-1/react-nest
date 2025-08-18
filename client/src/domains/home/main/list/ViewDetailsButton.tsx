import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

interface ViewDetailsButtonProps {
  questionId: number | string;
}

const ViewDetailsButton = ({ questionId }: ViewDetailsButtonProps) => {
  const navigate = useNavigate();
  const handleCardClick = (questionId: number | string) => {
    navigate(`/question/${questionId}`);
  };

  return (
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
      onClick={() => handleCardClick(questionId)}
    >
      확인하기
    </Button>
  );
};

export default ViewDetailsButton;
