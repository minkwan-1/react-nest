import GoogleIcon from "@mui/icons-material/Google";
import { NaverIcon } from "./SocialIcons";
import SocialButton from "./SocialButton";
import SectionTitle from "./SectionTitle";
import OrDivider from "./OrDivider";

const SignUpSocialButtons = (): JSX.Element => {
  return (
    <>
      <SectionTitle
        title="소셜 계정으로 Pullim 가입하기"
        subtitle="소셜 계정으로 빠르게 가입하고 질문을 시작하세요"
      />

      <SocialButton
        provider="google"
        icon={<GoogleIcon />}
        label="구글로 가입하기"
        isOutlined
      />

      <SocialButton
        provider="naver"
        icon={<NaverIcon />}
        label="네이버로 가입하기"
        customColor="#03C75A"
      />

      <OrDivider />
    </>
  );
};

export default SignUpSocialButtons;
