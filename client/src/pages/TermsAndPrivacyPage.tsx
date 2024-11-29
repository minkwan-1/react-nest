import { useState, ChangeEvent } from "react";
import { Box, Typography, Container } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { TermSection, CheckAgreeSection } from "../components/privacy";
import { termsData } from "../mock";

const TermsAndPrivacyPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  const handleSubmit = () => {
    if (isAgreed) {
      alert("약관에 동의하셨습니다.");
    } else {
      alert("약관에 동의해야 합니다.");
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Container maxWidth="md">
          <Box sx={{ marginTop: "100px" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Real_Code 이용약관
            </Typography>

            {termsData.map((term, index) => (
              <TermSection key={index} title={term.title}>
                {term.content}
              </TermSection>
            ))}

            <CheckAgreeSection
              isAgreed={isAgreed}
              handleAgreeChange={handleAgreeChange}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Container>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default TermsAndPrivacyPage;
