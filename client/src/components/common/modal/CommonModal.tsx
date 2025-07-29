import { useAtom } from "jotai";
import { commonModalAtom } from "@atom/modalAtoms";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const icons = {
  info: <InfoOutlinedIcon sx={{ fontSize: 52, color: "#b8dae1" }} />,
  error: <ErrorOutlineIcon sx={{ fontSize: 52, color: "#f44336" }} />,
  success: <CheckCircleOutlineIcon sx={{ fontSize: 52, color: "#4caf50" }} />,
  confirm: <HelpOutlineIcon sx={{ fontSize: 52, color: "#ff9800" }} />,
};

const CommonModal = () => {
  const [modalState, setModalState] = useAtom(commonModalAtom);

  const handleClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    handleClose();
  };

  return (
    <Dialog
      open={modalState.isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 3,
          minWidth: 320,
          textAlign: "center",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 1 }}>{icons[modalState.type]}</DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {modalState.title}
        </Typography>
        <Typography color="text.secondary">{modalState.info}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 0, pt: 3, gap: 1 }}>
        {modalState.type === "confirm" && (
          <Button
            onClick={handleClose}
            sx={{
              border: "1px solid #b8dae1",
              color: "black",
              "&:hover": {
                border: "1px solid #a8c9d0",
                color: "black",
              },
            }}
          >
            취소
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            bgcolor: "#b8dae1",
            "&:hover": {
              bgcolor: "#a8c9d0",
            },
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;
