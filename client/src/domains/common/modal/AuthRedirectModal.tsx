import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { authRedirectModalAtom } from "@atom/modalAtoms";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AuthRedirectModal = () => {
  const [isOpen, setIsOpen] = useAtom(authRedirectModalAtom);
  const navigate = useNavigate();

  // 모달을 닫기만 하는 핸들러
  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  // 모달을 닫고 페이지를 이동하는 핸들러
  const handleCloseAndRedirect = () => {
    setIsOpen(false);
    navigate("/start");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") {
          return;
        }
        handleCloseAndRedirect();
      }}
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
        <Typography color="text.secondary">
          사용자 정보가 없어요. 시작 페이지로 이동할게요.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 0, pt: 3, gap: 1.5 }}>
        {/* 취소 버튼 추가 */}
        {/* <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            px: 5,
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            color: "text.secondary",
            borderColor: "grey.400",
            "&:hover": {
              borderColor: "grey.600",
              bgcolor: "action.hover",
            },
          }}
        >
          취소
        </Button> */}
        {/* 확인 버튼 */}
        <Button
          onClick={handleCloseAndRedirect}
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

export default AuthRedirectModal;
