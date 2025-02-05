import { Controller, Get, Post, Redirect, Body } from '@nestjs/common';
import { NaverAuthService } from './naver.auth.service';

@Controller('auth/naver')
export class NaverAuthController {
  constructor(private readonly naverAuthService: NaverAuthService) {}

  private users: any[] = [];

  // 1. 네이버 로그인 URL로 리다이렉트
  @Get('login')
  @Redirect()
  async login() {
    const naverAuthUrl = this.naverAuthService.getNaverAuthUrl();
    console.log('Naver Auth URL:', naverAuthUrl);
    return { url: naverAuthUrl };
  }

  // 2. 네이버 리다이렉트 URI로 리다이렉션 후 인가 코드 받기
  @Post('user')
  async redirect(@Body('code') code: string, @Body('state') state: string) {
    console.log('Received authorization code:', code);

    // 3. 토큰 발급 요청
    const tokens = await this.naverAuthService.getToken(code, state);
    console.log('Token response:', tokens);

    // 4. 사용자 정보 가져오기
    const user = await this.naverAuthService.getUserInfo(tokens.access_token);
    console.log('User info:', user);

    // 5. 회원 확인 또는 신규 회원 등록
    const userInfo = this.naverAuthService.registerOrFindUser(user);

    // 6. 결과 반환
    return {
      message: '로그인 성공',
      user: userInfo,
    };
  }
}
