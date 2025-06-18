import { PageContainer, ComponentWrapper } from "@components/layout/common";
import { Box, Fade, CircularProgress } from "@mui/material";
import {
  MyInfoHeader,
  ProfileEditSection,
  InterestsSection,
  SocialMediaSection,
  SaveButton,
} from "@components/my-info";
import useMyInfoForm from "@components/my-info/hooks/useMyInfoForm";

const keyColor = "#b8dae1";

const MyInfoEditPage = () => {
  const {
    // 상태
    job,
    setJob,
    interests,
    interestInput,
    setInterestInput,
    socialLinks,
    isLoading,
    myInfo,

    // 핸들러
    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleSave,
  } = useMyInfoForm();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <PageContainer>
        <ComponentWrapper>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress sx={{ color: keyColor }} />
          </Box>
        </ComponentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ComponentWrapper>
        <Fade in timeout={800}>
          <Box>
            {/* 헤더 섹션 */}
            <MyInfoHeader />

            {/* 프로필 섹션 */}
            <ProfileEditSection job={job} setJob={setJob} />

            {/* 관심 분야 섹션 */}
            <InterestsSection
              interests={interests}
              handleDeleteInterest={handleDeleteInterest}
              interestInput={interestInput}
              setInterestInput={setInterestInput}
              handleAddInterest={handleAddInterest}
            />

            {/* 소셜 미디어 링크 섹션 */}
            <SocialMediaSection
              socialLinks={socialLinks}
              handleSocialLinkChange={handleSocialLinkChange}
              handleRemoveSocialLink={handleRemoveSocialLink}
              handleAddSocialLink={handleAddSocialLink}
            />

            {/* 저장 버튼 섹션 */}
            <SaveButton handleSave={handleSave} myInfo={myInfo} />
          </Box>
        </Fade>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default MyInfoEditPage;
