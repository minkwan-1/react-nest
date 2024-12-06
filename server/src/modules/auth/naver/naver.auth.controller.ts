import { Controller, Get, Query, Redirect } from '@nestjs/common';
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
  @Get('redirect')
  @Redirect('http://localhost:5173/', 302)
  async redirect(@Query('code') code: string, @Query('state') state: string) {
    console.log('Received authorization code:', code);
    // 3. 인가 코드를 통해 토큰 발급 요청
    const tokens = await this.naverAuthService.getToken(code, state);
    console.log(tokens);

    // 4. 토큰을 사용하여 사용자 정보 가져오기
    const user = await this.naverAuthService.getUserInfo(tokens.access_token);
    console.log('user info:', user);
    // 5. 회원 확인 또는 신규 회원 등록 (메모리 저장)
    const userInfo = this.naverAuthService.registerOrFindUser(user);

    // 6. 로그인 완료 후 프론트엔드로 리다이렉션
    return {
      message: '로그인 성공',
      user: userInfo,
    };
  }
}
