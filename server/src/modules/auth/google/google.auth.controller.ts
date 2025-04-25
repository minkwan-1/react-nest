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

    // 기존 유저 여부 판단
    const isValid = await this.googleAuthService.isValidExistingUser(
      userData.id,
    );

    if (isValid) {
      const existingUser = await this.googleAuthService.findUser(userData);
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

  @Post('user/update')
  async updateUser(
    @Body() body: { id: string; registrationComplete: boolean },
  ) {
    const { id, registrationComplete } = body;

    if (!id) {
      throw new HttpException(
        '사용자 ID가 누락되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const updatedUser = await this.googleAuthService.updateUser({
        id,
        registrationComplete,
      });

      return {
        message: '사용자 정보 업데이트 성공',
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '사용자 정보 업데이트 실패',
          message: error.message,
          details: error.response?.data,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
