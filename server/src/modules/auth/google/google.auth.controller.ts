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
    @Body('provider') provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!code) {
      throw new HttpException(
        '인가 코드가 제공되지 않았습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // 인가 코드로 액세스 토큰 교환
      const tokens = await this.googleAuthService.getToken(code);

      if (!tokens?.access_token) {
        throw new HttpException(
          '구글 액세스 토큰을 얻을 수 없습니다',
          HttpStatus.BAD_REQUEST,
        );
      }

      // 액세스 토큰으로 사용자 정보 획득
      const userData = await this.googleAuthService.getUserInfo(
        tokens.access_token,
      );

      // 기존 사용자인지 확인

      const user = await this.googleAuthService.findUser(userData);

      if (user.isExist) {
        const viaGoogleUser = await this.usersService.findByEmail(user.email);

        const addedProviderViaGoogleUser = { ...viaGoogleUser, provider };
        // 세션 로그인 처리 시작

        (req as any).login(addedProviderViaGoogleUser, (err: any) => {
          if (err) {
            throw new HttpException(
              '세션 로그인 실패',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }

          // 세션에 유저 정보 저장 (세션 미들웨어 사용)

          // (req as any).session.user = addedProviderViaGoogleUser;
          const user = (req as any).user;

          this.logger.debug('requset user@@@@@@@@@@@@@@:', user);

          res.send({
            message: '기존 유저 데이터',
            user: { ...addedProviderViaGoogleUser, isExist: true },
            // accessToken: tokens.access_token,
            // refreshToken: tokens.refresh_token,
            // expiresIn: tokens.expires_in,
          });
        });

        return;
      } else {
        res.send({
          message: '신규 유저 데이터',
          user,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresIn: tokens.expires_in,
        });
      }
    } catch {
      throw new HttpException(
        '인증 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user/update')
  async updateUser(@Body() userData) {
    try {
      // 구글 유저 테이블 생성
      const finalGoogleUser = await this.googleAuthService.createUser(userData);

      // 최종 유저 테이블 생성
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
    } catch {
      throw new HttpException(
        '사용자 등록 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    // console.log('request user:', req?.user);
    const user = (req as any).user;
    this.logger.debug('requset user++++++++++++++:', { ...user });
    this.logger.debug(`[세션확인 1] 현재 로그인된 사용자 정보 요청`);
    this.logger.debug('아이디:', user.id);
    this.logger.debug('함수 체크:', (req as any).isAuthenticated());
    this.logger.debug('함수 타입 체크:', typeof (req as any).isAuthenticated);

    if (!req.sessionID || !req.session?.user) {
      this.logger.error(`[세션확인 X] 세션 없음 - 로그인되지 않은 상태`);
      throw new HttpException(
        '로그인되지 않았습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 세션 정보 로깅
    this.logger.debug(
      `[세션확인 2] 유효한 세션 확인됨, 세션 ID: ${req.sessionID}`,
    );
    this.logger.verbose(
      `[세션확인 3] 세션에 담긴 유저 정보: ${JSON.stringify(req.session.user)}`,
    );

    return {
      user: req.session.user,
      sessionId: req.sessionID,
      requestUser: '체크',
    };
  }
}
