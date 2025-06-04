import { Box } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

import { handleCompleteSignupWithAPI } from "../api/auth/auth";
import { PhoneVerificationContainer } from "@components/phone";
import { useSyncUserInfo } from "@components/phone/hooks/useSyncUserInfo";

const PhoneVerificationPage = () => {
  const [userInfo, setUserInfo] = useSyncUserInfo();

  // 최종 회원가입 완료 처리 함수
  const handleCompleteSignup = async () => {
    if (!userInfo) {
      throw new Error("유저 정보가 없습니다.");
    }

    if (!userInfo.phoneNumber) {
      throw new Error("전화번호 인증이 완료되지 않았습니다.");
    }

    try {
      const newCompleteUserInfo = {
        ...userInfo,
        isExist: true,
        id: userInfo?.id,
        email: userInfo?.email,
        name: userInfo?.name,
        phoneNumber: userInfo.phoneNumber,
        provider: userInfo.provider,
      };

      const result = await handleCompleteSignupWithAPI(newCompleteUserInfo);

      if (!result.success) {
        throw new Error(result.message || "회원가입 중 오류가 발생했습니다.");
      }

      localStorage.removeItem("userInfo");

      return;
    } catch (error) {
      console.error("회원가입 처리 중 오류:", error);
      throw error;
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "600px" }}>
        <Box sx={{ padding: 4 }}>
          <PhoneVerificationContainer
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onSignupComplete={handleCompleteSignup}
          />
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
