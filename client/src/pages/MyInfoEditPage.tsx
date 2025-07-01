import { PageContainer, ComponentWrapper } from "@components/layout/common";
import { Box, Fade } from "@mui/material";
import {
  MyInfoHeader,
  ProfileEditSection,
  InterestsSection,
  SocialMediaSection,
  SaveButton,
  LoadingComponent,
} from "@components/my-info";
import useMyInfoForm from "@components/my-info/hooks/useMyInfoForm";

const MyInfoEditPage = () => {
  const {
    // 기존 상태
    nickname,
    setNickname,
    interests,
    interestInput,
    setInterestInput,
    socialLinks,
    profileImageUrl,
    setProfileImageUrl,
    isLoading,
    myInfo,

    // 기존 핸들러
    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleSave,
    handleProfileImageUpload,
  } = useMyInfoForm();

  // 로딩 상태 처리
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <PageContainer>
      <ComponentWrapper>
        <Fade in timeout={800}>
          <Box>
            {/* 헤더 섹션 */}
            <MyInfoHeader />

            {/* 프로필 섹션 - 프로필 이미지 관련 props 추가 */}
            <ProfileEditSection
              nickname={nickname}
              setNickname={setNickname}
              profileImageUrl={profileImageUrl}
              setProfileImageUrl={setProfileImageUrl}
              handleProfileImageUpload={handleProfileImageUpload}
            />

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
