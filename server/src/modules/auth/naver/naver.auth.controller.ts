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
import { UsersService } from 'src/users/users.service';

@Controller('auth/naver')
export class NaverAuthController {
  constructor(
    private readonly naverAuthService: NaverAuthService,
    private readonly usersService: UsersService,
  ) {}

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

    const tokens = await this.naverAuthService.getToken(code, state);
    const userData = await this.naverAuthService.getUserInfo(
      tokens.access_token,
    );
    const user = await this.naverAuthService.findUser(userData);
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
    // 1. 네이버 유저 테이블 만들기
    const finalGoogleUser = await this.naverAuthService.createUser(userData);

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
