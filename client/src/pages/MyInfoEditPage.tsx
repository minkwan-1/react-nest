import { PageContainer, ComponentWrapper } from "@domains/layout/common";
import { Box, Fade } from "@mui/material";
import {
  MyInfoHeader,
  ProfileEditSection,
  InterestsSection,
  SocialMediaSection,
  SaveButton,
  LoadingComponent,
} from "@domains/my-info";
import useMyInfoForm from "@domains/my-info/hooks/useMyInfoForm";

const MyInfoEditPage = () => {
  const {
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

    handleAddInterest,
    handleDeleteInterest,
    handleSocialLinkChange,
    handleAddSocialLink,
    handleRemoveSocialLink,
    handleSave,
    handleProfileImageUpload,
  } = useMyInfoForm();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "1200px" }}>
        <Fade in timeout={800}>
          <Box>
            <MyInfoHeader />

            <ProfileEditSection
              nickname={nickname}
              setNickname={setNickname}
              profileImageUrl={profileImageUrl}
              setProfileImageUrl={setProfileImageUrl}
              handleProfileImageUpload={handleProfileImageUpload}
            />

            <InterestsSection
              interests={interests}
              handleDeleteInterest={handleDeleteInterest}
              interestInput={interestInput}
              setInterestInput={setInterestInput}
              handleAddInterest={handleAddInterest}
            />

            <SocialMediaSection
              socialLinks={socialLinks}
              handleSocialLinkChange={handleSocialLinkChange}
              handleRemoveSocialLink={handleRemoveSocialLink}
              handleAddSocialLink={handleAddSocialLink}
            />

            <SaveButton handleSave={handleSave} myInfo={myInfo} />
          </Box>
        </Fade>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default MyInfoEditPage;
