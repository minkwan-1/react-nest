import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ErrorDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

function ErrorDialog({ open, message, onClose }: ErrorDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>로그인 오류</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
