import {
  Controller,
  Get,
  Post,
  Redirect,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NaverAuthService } from './naver.auth.service';

@Controller('auth/naver')
export class NaverAuthController {
  constructor(private readonly naverAuthService: NaverAuthService) {}

  @Get('login')
  @Redirect()
  async login() {
    try {
      const naverAuthUrl = this.naverAuthService.getNaverAuthUrl();
      return { url: naverAuthUrl };
    } catch {
      throw new HttpException(
        '네이버 로그인 URL 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user')
  async redirect(@Body('code') code: string, @Body('state') state: string) {
    if (!code) {
      throw new HttpException(
        '인가 코드가 제공되지 않았습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const tokens = await this.naverAuthService.getToken(code, state);
      const user = await this.naverAuthService.getUserInfo(tokens.access_token);
      const userInfo = await this.naverAuthService.findOrCreateUser(user);

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
