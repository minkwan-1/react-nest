import { Controller, Get, Body, Redirect, Post } from '@nestjs/common';
import { KakaoAuthService } from './kakao.auth.service';
// import { AuthService } from '../auth.service';

@Controller('auth/kakao')
export class KakaoAuthController {
  constructor(
    private readonly kakaoAuthService: KakaoAuthService,
    // private readonly authService: AuthService,
  ) {}

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

    // 3. 토큰
    try {
      const tokens = await this.kakaoAuthService.getToken(code);
      console.log('Token response:', tokens);

      // 4. 사용자 정보 가져오기
      const user = await this.kakaoAuthService.getUserInfo(
        tokens?.access_token,
      );
      console.log('User info:', user);

      // 5. 회원 확인 또는 신규 회원 추가
      const userInfo = await this.kakaoAuthService.registerOrFindUser(user);

      // 6. JWT 토큰 생성
      // let jwtTokens = null;
      // if (userInfo.isExisted) {
      //   // 기존 회원인 경우에만 JWT 토큰 생성
      //   jwtTokens = this.authService.generateToken(userInfo.user, 'kakao');
      //   console.log('JWT 토큰 생성됨:', jwtTokens);
      // }

      // 7. 결과 반환
      return {
        message: userInfo.message,
        user: userInfo.user,
        // tokens: jwtTokens, // 기존 회원의 경우에만 토큰 포함, 신규 회원은 null
      };
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
}
