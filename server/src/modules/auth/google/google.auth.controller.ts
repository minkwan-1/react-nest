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
import { UsersService } from 'src/users/users.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly usersService: UsersService,
  ) {}

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

    const user = await this.googleAuthService.findUser(userData);
    if (user.isExist) {
      return {
        message: '기존 유저 데이터',
        user,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      };
    } else {
      return {
        message: '신규 유저 데이터',
        user,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      };
    }
  }

  @Post('user/update')
  async updateUser(@Body() userData) {
    // 1. 구글 유저 테이블 만들기
    const finalGoogleUser = await this.googleAuthService.createUser(userData);

    // 2. 최종 유저 테이블 만들기
    const parseFinalUser = {
      email: userData.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
    };

    const finalUser = await this.usersService.create(parseFinalUser);

    return {
      finalGoogleUser,
      finalUser,
    };
  }
}
