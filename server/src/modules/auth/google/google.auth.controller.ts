import {
  Controller,
  Get,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GoogleAuthService } from './google.auth.service';
import { Response } from 'express';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  redirectToGoogle(@Res() res: Response) {
    try {
      const url = this.googleAuthService.getGoogleAuthUrl();
      return res.redirect(url);
    } catch {
      throw new HttpException(
        '구글 로그인 URL 생성 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('callback')
  async handleGoogleCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    if (!code) {
      throw new HttpException(
        'code 쿼리 파라미터가 누락되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const tokenData = await this.googleAuthService.getToken(code);
      const userInfo = await this.googleAuthService.getUserInfo(
        tokenData.access_token,
      );

      const user = await this.googleAuthService.findOrCreateUser(
        userInfo,
        tokenData.refresh_token,
      );

      // 등록 완료 여부에 따라 분기
      if (user.registrationComplete) {
        return res.redirect(`/home?userId=${user.id}`);
      } else {
        return res.redirect(`/phone?userId=${user.id}`);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: '구글 인증 처리 중 오류 발생',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
