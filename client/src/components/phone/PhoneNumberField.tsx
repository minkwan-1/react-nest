// components/phone/PhoneInput.tsx
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";

interface PhoneInputProps {
  onSend: (phoneNumber: string) => void;
  isSending: boolean;
}

const PhoneNumberField = ({ onSend, isSending }: PhoneInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="휴대폰 번호"
        placeholder="+821012345678"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSend(phoneNumber)}
        disabled={isSending || !phoneNumber}
        fullWidth
        sx={{ mt: 1, mb: 3, height: "48px" }}
        endIcon={<SendIcon />}
      >
        {isSending ? <CircularProgress size={24} /> : "인증 코드 발송"}
      </Button>
    </Box>
  );
};

export default PhoneNumberField;
