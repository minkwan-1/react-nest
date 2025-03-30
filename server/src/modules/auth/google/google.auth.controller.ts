import { Controller, Get, Redirect, Post, Body } from '@nestjs/common';
import { GoogleAuthService } from './google.auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

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

    const tokens = await this.googleAuthService.getToken(code);
    console.log('Token response:', tokens);

    const user = await this.googleAuthService.getUserInfo(tokens.access_token);
    console.log('User info:', user);

    const userInfo = await this.googleAuthService.findUser(user);
    console.log('유저 정보:', userInfo);

    return {
      message: '조회 성공',
      user: userInfo,
    };
  }
}
