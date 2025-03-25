import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface VerificationInputProps {
  onVerify: (code: string) => void;
  isVerifying: boolean;
}

const VerificationInput = ({
  onVerify,
  isVerifying,
}: VerificationInputProps) => {
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <Box>
      <TextField
        fullWidth
        label="인증 코드"
        placeholder="6자리 코드 입력"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onVerify(verificationCode)}
        disabled={isVerifying || !verificationCode}
        fullWidth
        sx={{ mt: 1, height: "48px" }}
        endIcon={<CheckCircleIcon />}
      >
        {isVerifying ? <CircularProgress size={24} /> : "인증 확인"}
      </Button>
    </Box>
  );
};

export default VerificationInput;
