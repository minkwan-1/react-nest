import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Redirect,
  HttpException,
  HttpStatus,
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

  // [GET] 구글 로그인 URL 제공
  @Get('callback')
  @Redirect()
  async callback() {
    const url = this.googleAuthService.getGoogleAuthUrl();
    return { url };
  }

  // [POST] 구글 로그인 콜백: 사용자 식별 및 세션 처리
  @Post('user')
  async handleGoogleAuth(
    @Body('code') code: string,
    @Body('provider') provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const tokens = await this.googleAuthService.getToken(code);
      const userData = await this.googleAuthService.getUserInfo(
        tokens.access_token,
      );
      const user = await this.googleAuthService.findUser(userData);
      console.log('회원가입 시의 user: ', user);
      // 101607928260984472861
      if (user.isExist) {
        const dbUser = await this.usersService.findByAccountID(user.id);
        const mergedUser = { ...dbUser, provider };

        try {
          await this.sessionService.loginWithSession(req, mergedUser);

          return res.send({
            message: '기존 유저 데이터',
            user: { ...mergedUser, isExist: true },
            sessionId: req.sessionID,
          });
        } catch (sessionError) {
          console.error('세션 로그인 처리 중 오류:', sessionError);
          throw new HttpException(
            '세션 처리 중 오류가 발생했습니다',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      return res.send({
        message: '신규 유저 데이터',
        user,
        // accessToken: tokens.access_token,
        // refreshToken: tokens.refresh_token,
        // expiresIn: tokens.expires_in,
      });
    } catch (err) {
      console.error('인증 처리 중 오류:', err);
      throw new HttpException(
        '인증 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // [POST] 사용자 정보 저장 (최초 회원가입 처리)
  @Post('user/update')
  async updateUser(@Body() userData: any) {
    console.log('최종 가입 직전 유저 정보: ', userData);
    try {
      const finalGoogleUser = await this.googleAuthService.createUser(userData);

      const finalUser = await this.usersService.create({
        email: userData.email,
        name: userData.name,
        accountID: userData.id,
        phoneNumber: userData.phoneNumber,
      });
      return { finalGoogleUser, finalUser };
    } catch (err) {
      console.log(err);
    }
  }
}
