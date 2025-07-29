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

import { useNavigate } from "react-router-dom";

const CommonModal = () => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useAtom(commonModalAtom);

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: "info",
      title: "",
      info: "",
      navigateTo: undefined,
    });

    if (modalState.navigateTo) {
      navigate(modalState.navigateTo);
    }
  };

  return (
    <Dialog
      open={modalState.isOpen}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          borderRadius: 4,

          p: 3,

          minWidth: 320,

          textAlign: "center",

          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",

          border: "1px solid #b8dae130",
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 1 }}>
        <InfoOutlinedIcon sx={{ fontSize: 52, color: "#b8dae1" }} />
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          알림
        </Typography>

        <Typography color="text.secondary">{modalState.info}</Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 0, pt: 3 }}>
        <Button
          onClick={handleCloseModal}
          variant="contained"
          sx={{
            px: 5,

            py: 1.2,

            borderRadius: 2,

            textTransform: "none",

            fontWeight: 600,

            bgcolor: "#b8dae1",

            boxShadow: "none",

            "&:hover": {
              bgcolor: "#a8c9d0",

              boxShadow: "none",

              transform: "translateY(-1px)",
            },

            transition: "all 0.2s ease-in-out",
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;
