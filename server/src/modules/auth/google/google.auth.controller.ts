import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { GoogleAuthService } from './google.auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  private users: any[] = [];

  // 1. 구글 로그인 URL로 리다이렉트
  @Get('login')
  @Redirect()
  async login() {
    const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
    console.log('Google Auth URL:', googleAuthUrl);
    return { url: googleAuthUrl };
  }

  @Get('redirect')
  @Redirect('http://localhost:5173/', 302)
  async redirect(@Query('code') code: string) {
    console.log('Received authorization code:', code);

    // 3. 인가 코드를 통해 토큰 발급 요청
    const tokens = await this.googleAuthService.getToken(code);
    console.log(tokens);

    // 4. 토큰을 사용하여 사용자 정보 가져오기
    const user = await this.googleAuthService.getUserInfo(tokens.access_token);
    console.log('user info:', user);

    // 5. 회원 확인 또는 신규 회원 등록 (메모리 저장)
    const userInfo = this.googleAuthService.registerOrFindUser(user);

    // 6. 로그인 완료 후 프론트엔드로 리다이렉션
    return {
      message: '로그인 성공',
      user: userInfo,
    };
  }
}
