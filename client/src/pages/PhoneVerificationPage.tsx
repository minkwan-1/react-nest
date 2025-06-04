import { Box } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { PhoneVerificationContainer } from "@components/phone";
import { useSyncUserInfo, useHandleSignup } from "@components/phone/hooks";

const PhoneVerificationPage = () => {
  const [userInfo, setUserInfo] = useSyncUserInfo();
  const handleCompleteSignup = useHandleSignup();

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
