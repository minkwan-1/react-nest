import {
  Controller,
  Get,
  Redirect,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthService } from './google.auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { SessionService } from '../session/session.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly usersService: UsersService,
    private readonly sessionService: SessionService,
  ) {}

  // 1. Google 로그인 URL을 제공하는 GET 엔드포인트
  @Get('login')
  @Redirect()
  async login() {
    const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
    return { url: googleAuthUrl };
  }

  // 2. Google OAuth 인증 후 리디렉션 및 사용자 정보 처리

  @Post('user')
  async redirect(
    @Body('code') code: string,
    @Body('provider') provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // 5. 인가 코드로 액세스 토큰을 교환
      const tokens = await this.googleAuthService.getToken(code);

      // 6. 액세스 토큰으로 사용자 정보 획득
      const userData = await this.googleAuthService.getUserInfo(
        tokens.access_token,
      );

      // 7. 기존 사용자 여부 확인
      const user = await this.googleAuthService.findUser(userData);

      if (user.isExist) {
        // 8. 기존 사용자일 경우, 세션 로그인 처리
        const viaGoogleUser = await this.usersService.findByEmail(user.email);
        const addedProviderViaGoogleUser = { ...viaGoogleUser, provider };

        try {
          // 9. SessionService를 사용한 세션 로그인 처리
          await this.sessionService.loginWithSession(
            req,
            addedProviderViaGoogleUser,
          );

          // 10. 기존 사용자 데이터 반환
          res.send({
            message: '기존 유저 데이터',
            user: { ...addedProviderViaGoogleUser, isExist: true },
            sessionId: req.sessionID, // 세션 ID도 함께 반환
          });
        } catch (sessionError) {
          console.error('세션 로그인 처리 중 오류:', sessionError);
          throw new HttpException(
            '세션 처리 중 오류가 발생했습니다',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return;
      } else {
        // 11. 신규 사용자일 경우, 사용자 정보를 반환
        res.send({
          message: '신규 유저 데이터',
          user,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresIn: tokens.expires_in,
        });
      }
    } catch {
      // 12. 오류 발생 시, HTTP 예외 처리
      throw new HttpException(
        '인증 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 13. 사용자 정보를 업데이트하거나 신규 생성하는 POST 엔드포인트
  @Post('user/update')
  async updateUser(@Body() userData) {
    // 14. 구글 사용자 정보 테이블 생성
    const finalGoogleUser = await this.googleAuthService.createUser(userData);

    // 15. 최종 사용자 테이블 생성
    const parseFinalUser = {
      email: userData.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
    };

    const finalUser = await this.usersService.create(parseFinalUser);

    // 16. 생성된 사용자 정보 반환
    return {
      finalGoogleUser,
      finalUser,
    };
  }
}
