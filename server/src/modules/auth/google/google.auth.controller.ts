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

  @Get('callback')
  @Redirect()
  async callback() {
    const url = this.googleAuthService.getGoogleAuthUrl();
    return { url };
  }

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

      if (user.isExist) {
        const dbUser = await this.usersService.findByAccountID(user.id);

        if (!dbUser) {
          const newUserPayload = { ...user, isExist: false };
          return res.send({
            message: '신규 유저 데이터',
            user: newUserPayload,
          });
        }

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
      });
    } catch (err) {
      console.error('인증 처리 중 오류:', err);
      throw new HttpException(
        '인증 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user/update')
  async updateUser(
    @Body() userData: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('구글 프로바이더', userData);
    try {
      const finalUser = await this.usersService.create({
        email: userData.email,
        name: userData.name,
        accountID: userData.id,
        phoneNumber: userData.phoneNumber,
      });

      if (userData.provider === 'google') {
        await this.googleAuthService.updateUser(userData);
      }
      const mergedUser = { ...finalUser, provider: userData.provider };
      await this.sessionService.loginWithSession(req, mergedUser);

      return res.send({
        message: '신규 가입 및 로그인 성공',
        user: { ...mergedUser, isExist: true },
        sessionId: req.sessionID,
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        '회원가입 처리 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
