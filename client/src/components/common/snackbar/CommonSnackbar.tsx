import { Snackbar, Alert } from "@mui/material";
import { useAtom } from "jotai";
import { snackbarAtom } from "@atom/snackbarAtom";

const Commonsnackbar = () => {
  const [snackbarData, setSnackbarData] = useAtom(snackbarAtom);

  const handleCloseSnackbar = () => {
    setSnackbarData({ isOpen: false, message: "" });
  };

  return (
    <Snackbar
      open={snackbarData.isOpen}
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
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );
};

export default Commonsnackbar;
