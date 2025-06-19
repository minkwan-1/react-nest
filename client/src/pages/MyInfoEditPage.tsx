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
    job,
    setJob,
    interests,
    interestInput,
    setInterestInput,
    socialLinks,
    isLoading,
    myInfo,

    // 프로필 이미지 관련 상태
    fileInputRef,
    selectedImage,
    previewUrl,
    isUploading,

    // 기존 핸들러
    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleSave,

    // 프로필 이미지 관련 핸들러
    handleCameraClick,
    handleFileChange,
  } = useMyInfoForm();

  console.log(selectedImage);

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
              job={job}
              setJob={setJob}
              fileInputRef={fileInputRef}
              previewUrl={previewUrl}
              isUploading={isUploading}
              handleCameraClick={handleCameraClick}
              handleFileChange={handleFileChange}
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
