import { Box, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

interface OwnerActionButtonsProps {
  questionId: number | string;
}

const OwnerActionButtons = ({ questionId }: OwnerActionButtonsProps) => {
  const navigate = useNavigate();

  const handleDeleteClick = async (questionId: number | string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        console.log("삭제:", questionId);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        size="small"
        aria-label="삭제"
        sx={{ color: "#757575" }}
        onClick={() => handleDeleteClick(questionId)}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label="수정"
        sx={{ color: "#757575" }}
        onClick={() => {
          navigate(`/modify/${questionId}`);
        }}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default OwnerActionButtons;
