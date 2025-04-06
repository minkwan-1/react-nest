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

    try {
      const tokens = await this.googleAuthService.getToken(code);
      const user = await this.googleAuthService.getUserInfo(
        tokens.access_token,
      );
      const userInfo = await this.googleAuthService.findOrCreateUser(user);

      return {
        message: '조회 성공',
        user: userInfo,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        '서버 내부 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
