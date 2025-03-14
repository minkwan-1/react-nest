interface KakaoLoginButtonProps {
  kakaoImage: string;
  onKakaoClick: () => void;
}

function KakaoLoginButton({ kakaoImage, onKakaoClick }: KakaoLoginButtonProps) {
  return (
    <img
      src={kakaoImage}
      alt="Kakao 로그인"
      style={{ width: "32px", height: "32px", cursor: "pointer" }}
      onClick={onKakaoClick}
    />
  );
}

export default KakaoLoginButton;
