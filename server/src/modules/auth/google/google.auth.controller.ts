import { Controller, Get, Redirect, Post, Body } from '@nestjs/common';
import { GoogleAuthService } from './google.auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  // 1. 구글 로그인 URL로 리다이렉트
  @Get('login')
  @Redirect()
  async login() {
    const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
    console.log('Google Auth URL:', googleAuthUrl);
    return { url: googleAuthUrl };
  }

  @Post('user')
  async redirect(@Body('code') code: string) {
    console.log('Received authorization code:', code);

    // 3. 토큰 발급 요청
    const tokens = await this.googleAuthService.getToken(code);
    console.log('Token response:', tokens);

    // 4. 사용자 정보 가져오기
    const user = await this.googleAuthService.getUserInfo(tokens.access_token);
    console.log('User info:', user);

    // 5. 회원 확인 또는 신규 회원 등록
    const userInfo = this.googleAuthService.registerOrFindUser(user);

    // 6. 결과 반환
    return {
      message: '로그인 성공',
      user: userInfo,
    };
  }
}
