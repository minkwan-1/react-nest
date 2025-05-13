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
    const googleAuthUrl = this.googleAuthService.getGoogleAuthUrl();
    return { url: googleAuthUrl };
  }

  @Post('user')
  async redirect(
    @Body('code') code: string,
    @Body('provider') provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // 인가 코드로 액세스 토큰 교환
      const tokens = await this.googleAuthService.getToken(code);

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
          const user = (req as any).user;

          console.log(user);

          res.send({
            message: '기존 유저 데이터',
            user: { ...addedProviderViaGoogleUser, isExist: true },
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
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    // console.log('request user:', req?.user);
    const user = (req as any).user;
    console.log({ ...user });
    console.log((req as any).isAuthenticated());

    const isAuthenticated = (req as any).isAuthenticated();
    return {
      isAuthenticated,
      user,
      sessionId: req.sessionID,
      session: req.session,
    };
  }
}
