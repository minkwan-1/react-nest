import {
  Controller,
  Get,
  Redirect,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthService } from './google.auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth/google')
export class GoogleAuthController {
  private readonly logger = new Logger(GoogleAuthController.name);

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
  async redirect(
    @Body('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!code) {
      throw new HttpException(
        '인가 코드가 제공되지 않았습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.googleAuthService.getToken(code);

    if (!tokens?.access_token) {
      throw new HttpException(
        '구글 액세스 토큰을 얻을 수 없습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userData = await this.googleAuthService.getUserInfo(
      tokens.access_token,
    );
    const user = await this.googleAuthService.findUser(userData);
    const email = user.email;

    if (user.isExist) {
      const viaGoogleUser = await this.usersService.findByEmail(email);

      (req as any).login(viaGoogleUser, (err: any) => {
        if (err) {
          throw new HttpException(
            '세션 로그인 실패',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        (req as any).session.user = viaGoogleUser;

        res.send({
          message: '기존 유저 데이터',
          sessionId: (req as any).sessionID,
          user: { ...viaGoogleUser, isExist: true },
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresIn: tokens.expires_in,
        });
      });

      // 주의: 이 return은 실제로 사용되지 않음
      return;
    } else {
      res.send({
        message: '신규 유저 데이터',
        sessionId: (req as any).sessionID, // 세션 없음 주의
        user,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      });
    }
  }

  @Post('user/update')
  async updateUser(@Body() userData) {
    // 구글 유저 테이블 만들기
    const finalGoogleUser = await this.googleAuthService.createUser(userData);

    // 로깅 추가
    this.logger.log(`구글 유저 생성 결과: ${JSON.stringify(finalGoogleUser)}`);

    // 최종 유저 테이블 만들기
    const parseFinalUser = {
      email: userData.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
    };

    const finalUser = await this.usersService.create(parseFinalUser);

    // 로깅 추가
    this.logger.log(`최종 유저 생성 결과: ${JSON.stringify(finalUser)}`);

    return {
      finalGoogleUser,
      finalUser,
    };
  }

  // 세션 확인 API 개발
  @Get('me')
  async getMe(@Req() req: Request) {
    if (!req.sessionID) {
      throw new HttpException(
        '로그인되지 않았습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      user: req.session.user,
      sessionId: req.sessionID,
    };
  }
}
