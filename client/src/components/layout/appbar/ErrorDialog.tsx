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
      {/* Dialog Title */}
      <DialogTitle>로그인 오류</DialogTitle>

      {/* Dialog Content */}
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
