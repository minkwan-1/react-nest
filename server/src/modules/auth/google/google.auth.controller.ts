import {
  Controller,
  Get,
  Redirect,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
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
    const user = await this.googleAuthService.getUserInfo(tokens.access_token);
    const userInfo = await this.googleAuthService.createUser(
      user,
      tokens.refresh_token,
    );

    return {
      message: '조회 성공',
      user: userInfo,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
    };
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        '리프레시 토큰이 제공되지 않았습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // 리프레시 토큰으로 사용자 찾기
      const user =
        await this.googleAuthService.getUserByRefreshToken(refreshToken);

      if (!user) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다');
      }

      // 토큰 갱신
      const newTokens = await this.googleAuthService.refreshToken(refreshToken);

      // 새 액세스 토큰으로 사용자 정보 가져오기
      const userData = await this.googleAuthService.getUserInfo(
        newTokens.access_token,
      );

      // 새 리프레시 토큰이 있는 경우 저장
      if (newTokens.refresh_token) {
        await this.googleAuthService.updateRefreshToken(
          userData.id,
          newTokens.refresh_token,
        );
      }

      return {
        message: '토큰 갱신 성공',
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token || refreshToken, // 새 리프레시 토큰이 없으면 기존 것 반환
        expiresIn: newTokens.expires_in,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        '토큰 갱신 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
