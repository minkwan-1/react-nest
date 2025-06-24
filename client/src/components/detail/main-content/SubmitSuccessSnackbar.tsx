import { Snackbar, Alert } from "@mui/material";

type SubmitSuccessSnackbarProps = {
  submitSuccess: boolean;
  handleCloseSnackbar: () => void;
};

const SubmitSuccessSnackbar = ({
  submitSuccess,
  handleCloseSnackbar,
}: SubmitSuccessSnackbarProps) => {
  return (
    <Snackbar
      open={submitSuccess}
      autoHideDuration={4000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="success"
        sx={{
          borderRadius: 3,
          fontWeight: 600,
          fontSize: "15px",
          boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
          "& .MuiAlert-icon": {
            fontSize: "20px",
          },
        }}
      >
        🎉 답변이 성공적으로 등록되었습니다!
      </Alert>
    </Snackbar>
  );
};

export default SubmitSuccessSnackbar;
