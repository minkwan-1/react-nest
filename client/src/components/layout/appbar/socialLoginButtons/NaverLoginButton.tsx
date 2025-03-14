interface NaverLoginButtonProps {
  naverImage: string;
  onNaverClick: () => void;
}

function NaverLoginButton({ naverImage, onNaverClick }: NaverLoginButtonProps) {
  return (
    <img
      src={naverImage}
      alt="Naver 로그인"
      style={{ width: "32px", height: "32px", cursor: "pointer" }}
      onClick={onNaverClick}
    />
  );
}

export default NaverLoginButton;
