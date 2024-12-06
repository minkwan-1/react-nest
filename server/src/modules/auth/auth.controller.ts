// // test code
// import { Controller, Get, Query, Redirect } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { GoogleAuthService } from './google/google.auth.service';
// import { KakaoAuthService } from './kakao/kakao.auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly googleAuthService: GoogleAuthService,
//     private readonly kakaoAuthService: KakaoAuthService,
//   ) {}

//   // 구글 로그인
//   @Get('google/login')
//   @Redirect()
//   async googleLogin() {
//     return { url: this.googleAuthService.getGoogleAuthUrl() };
//   }

//   @Get('google/redirect')
//   @Redirect('http://localhost:5173/', 302)
//   async googleRedirect(@Query('code') code: string) {
//     const tokens = await this.googleAuthService.getToken(code);
//     const user = await this.googleAuthService.getUserInfo(tokens.access_token);
//     const registeredUser = this.authService.registerOrFindUser(user, 'google');
//     return { message: 'Google 로그인 성공', user: registeredUser };
//   }

//   // 카카오 로그인
//   @Get('kakao/login')
//   @Redirect()
//   async kakaoLogin() {
//     return { url: this.kakaoAuthService.getKakaoAuthUrl() };
//   }

//   @Get('kakao/redirect')
//   @Redirect('http://localhost:5173/', 302)
//   async kakaoRedirect(@Query('code') code: string) {
//     const tokens = await this.kakaoAuthService.getToken(code);
//     const user = await this.kakaoAuthService.getUserInfo(tokens.access_token);
//     const registeredUser = this.authService.registerOrFindUser(user, 'kakao');
//     return { message: 'Kakao 로그인 성공', user: registeredUser };
//   }

//   // 디버깅용: 모든 유저 확인
//   @Get('users')
//   getAllUsers() {
//     return this.authService.getAllUsers();
//   }
// }
