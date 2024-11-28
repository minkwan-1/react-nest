import { useState, ChangeEvent } from "react";
import { Box, Typography, Container } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { TermSection, CheckAgreeSection } from "../components/privacy";

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

  const termsData = [
    {
      title: "[여러분을 환영합니다.]",
      content:
        "Real_Code 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 Real_Code 서비스의 이용과 관련하여 Real_Code 서비스를 제공하는 Real_Code 주식회사(이하 ‘Real_Code’)와 이를 이용하는 Real_Code 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 Real_Code 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.",
    },
    {
      title:
        "[회원으로 가입하시면 Real_Code 서비스를 보다 편리하게 이용할 수 있습니다.]",
      content:
        "여러분은 본 약관을 읽고 동의하신 후 회원 가입을 신청하실 수 있으며, Real_Code는 이에 대한 승낙을 통해 회원 가입 절차를 완료하고 여러분께 Real_Code 서비스 이용 계정(이하 ‘계정’)을 부여합니다. 계정이란 회원이 Real_Code 서비스에 로그인한 이후 이용하는 각종 서비스 이용 이력을 회원 별로 관리하기 위해 설정한 회원 식별 단위를 말합니다.",
    },
    {
      title: "[여러분이 제공한 콘텐츠를 소중히 다룰 것입니다.]",
      content:
        "Real_Code는 여러분이 게재한 게시물이 Real_Code 서비스를 통해 다른 이용자들에게 전달되어 우리 모두의 삶을 더욱 풍요롭게 해줄 것을 기대합니다. 게시물은 여러분이 타인 또는 자신이 보게 할 목적으로 Real_Code 서비스 상에 게재한 부호, 문자, 음성, 음향, 그림, 사진, 동영상, 링크 등으로 구성된 각종 콘텐츠 자체 또는 파일을 말합니다.",
    },
    {
      title: "[여러분의 개인정보를 소중히 보호합니다.]",
      content:
        "Real_Code는 서비스의 원활한 제공을 위하여 회원이 동의한 목적과 범위 내에서만 개인정보를 수집, 이용하며, 개인정보 보호 관련 법령에 따라 안전하게 관리합니다. Real_Code가 이용자 및 회원에 대해 관련 개인정보를 안전하게 처리하기 위하여 기울이는 노력이나 기타 상세한 사항은 개인정보 처리방침에서 확인하실 수 있습니다.",
    },
    {
      title: "[타인의 권리를 존중해 주세요.]",
      content:
        "여러분이 무심코 게재한 게시물로 인해 타인의 저작권이 침해되거나 명예훼손 등 권리 침해가 발생할 수 있습니다. Real_Code는 이에 대한 문제 해결을 위해 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 및 ‘저작권법’ 등을 근거로 권리침해 주장자의 요청에 따른 게시물 게시중단, 원 게시자의 이의신청에 따른 해당 게시물 게시 재개 등을 내용으로 하는 권리보호센터를 운영하고 있습니다.",
    },
  ];

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
