import { Box, IconButton, Button } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const CardActionsSection = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", border: "1px solid red" }}
    >
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
      >
        확인하기
      </Button>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="small" aria-label="삭제" sx={{ color: "#757575" }}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" aria-label="수정" sx={{ color: "#757575" }}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardActionsSection;
