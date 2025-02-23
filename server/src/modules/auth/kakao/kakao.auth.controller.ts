import { Controller, Get, Body, Redirect, Post } from '@nestjs/common';
import { KakaoAuthService } from './kakao.auth.service';

@Controller('auth/kakao')
export class KakaoAuthController {
  constructor(private readonly kakaoAuthService: KakaoAuthService) {}

  // 1. 인가 코드 발급 요청 (카카오 로그인 URL로 리다이렉트)
  @Get('login')
  @Redirect()
  async login() {
    const kakaoAuthUrl = this.kakaoAuthService.getKakaoAuthUrl();
    console.log('Kakao Auth URL:', kakaoAuthUrl);
    return { url: kakaoAuthUrl };
  }

  // 2. 카카오 리다이렉트 URI로 리다이렉션 후 인가 코드 받기
  @Post('user')
  async redirect(@Body('code') code: string) {
    console.log('Received authorization code:', code);

    // 3. 토큰 발급
    const tokens = await this.kakaoAuthService.getToken(code);
    console.log('Token response:', tokens);

    // 4. 사용자 정보 가져오기
    const user = await this.kakaoAuthService.getUserInfo(tokens.access_token);
    console.log('User info:', user);

    // 5. 회원 확인 또는 신규 회원 추가
    const userInfo = await this.kakaoAuthService.registerOrFindUser(user);

    // 6. 로그인 완료 후 프론트엔드로 리다이렉션
    return {
      message: userInfo.message,
      user: userInfo.user,
    };
  }
}
