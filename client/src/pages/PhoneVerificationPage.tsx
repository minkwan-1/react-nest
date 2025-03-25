import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  InputAdornment,
  Chip,
  Fade,
} from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import axios from "axios";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PhoneVerificationTitle } from "@components/phone";

// Define a custom error interface
interface ApiError {
  response?: {
    data: {
      message: string;
    };
  };
}

const PhoneVerificationPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "info">(
    "info"
  );
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setUserInfo]);

  // userInfo 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  console.log("/phone에서 전역 변수 반영 체크:", userInfo);

  // 전화번호 인증 코드 발송 처리 함수
  const handleSendCode = async () => {
    console.log("Sending verification code for phone number:", phoneNumber);
    setIsSending(true);
    try {
      // phoneNumber가 요청 본문에 포함되어 전달되는지 확인
      const response = await axios.post("http://localhost:3000/api/send-code", {
        toPhoneNumber: phoneNumber, // 'phoneNumber' 대신 'toPhoneNumber'로 전달
      });
      console.log("Response from send-code:", response.data);
      setMessage(response.data.message || "인증 코드가 발송되었습니다!");
      setMessageType("success");
      setCodeSent(true);
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error sending verification code:", apiError);
      setMessage(
        apiError.response?.data?.message || "인증 코드 발송에 실패했습니다."
      );
      setMessageType("error");
    } finally {
      setIsSending(false);
    }
  };

  // 인증 코드 확인 처리 함수
  const handleVerifyCode = async () => {
    console.log(
      "Verifying code for phone number:",
      phoneNumber,
      "with code:",
      verificationCode
    );
    setIsVerifying(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/verify-code",
        {
          phoneNumber,
          verificationCode,
        }
      );
      console.log("Response from verify-code:", response.data);
      setMessage(response.data.message || "전화번호가 인증되었습니다!");
      setMessageType("success");
      if (
        response.data.message === "Phone number verified and user registered!"
      ) {
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error verifying verification code:", apiError);
      setMessage(apiError.response?.data?.message || "인증에 실패했습니다.");
      setMessageType("error");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "600px" }}>
        <Paper
          sx={{
            padding: 4,
          }}
        >
          <PhoneVerificationTitle />

          {/* 사용자 정보 표시 섹션 */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "rgba(0, 0, 0, 0.02)",
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              회원 정보
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value={userInfo?.name || ""}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              placeholder="이름"
              size="small"
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value={userInfo?.email || ""}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              placeholder="이메일"
              size="small"
            />
          </Box>

          {/* 전화번호 인증 섹션 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              휴대폰 번호를 입력해주세요
            </Typography>
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
              onClick={handleSendCode}
              disabled={isSending || !phoneNumber}
              fullWidth
              sx={{ mt: 1, mb: 3, height: "48px" }}
              endIcon={<SendIcon />}
            >
              {isSending ? <CircularProgress size={24} /> : "인증 코드 발송"}
            </Button>
          </Box>

          <Fade in={codeSent}>
            <Box>
              <Divider sx={{ mb: 3 }}>
                <Chip
                  label="인증 코드 확인"
                  color="primary"
                  variant="outlined"
                />
              </Divider>

              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                발송된 인증 코드를 입력해주세요
              </Typography>

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
                onClick={handleVerifyCode}
                disabled={isVerifying || !verificationCode}
                fullWidth
                sx={{ mt: 1, height: "48px" }}
                endIcon={<CheckCircleIcon />}
              >
                {isVerifying ? <CircularProgress size={24} /> : "인증 확인"}
              </Button>
            </Box>
          </Fade>

          {message && (
            <Box
              mt={3}
              p={2}
              bgcolor={
                messageType === "error"
                  ? "rgba(255, 0, 0, 0.05)"
                  : messageType === "success"
                  ? "rgba(0, 255, 0, 0.05)"
                  : "rgba(0, 0, 255, 0.05)"
              }
              borderRadius={1}
            >
              <Typography
                color={
                  messageType === "error"
                    ? "error"
                    : messageType === "success"
                    ? "success.main"
                    : "info.main"
                }
              >
                {message}
              </Typography>
            </Box>
          )}
        </Paper>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
