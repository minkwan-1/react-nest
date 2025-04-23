import {
  Controller,
  Get,
  Redirect,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GoogleAuthService } from './google.auth.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('login')
  @Redirect()
  async login() {
    try {
      const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
      return { url: googleAuthUrl };
    } catch {
      throw new HttpException(
        '구글 로그인 URL 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user')
  async redirect(@Body('code') code: string) {
    if (!code) {
      throw new HttpException(
        '인가 코드가 제공되지 않았습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.googleAuthService.getToken(code);
    const userData = await this.googleAuthService.getUserInfo(
      tokens.access_token,
    );

    // 이미 존재하는 유저인지 확인
    const existingUser = await this.googleAuthService.findUser(userData);

    if (existingUser?.isExist) {
      return {
        message: '기존 유저 로그인 성공',
        user: existingUser,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      };
    }

    // 신규 유저라면 회원가입 진행
    const newUser = await this.googleAuthService.createUser(userData);

    return {
      message: '신규 유저 회원가입 성공',
      user: newUser,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
    };
  }
}
