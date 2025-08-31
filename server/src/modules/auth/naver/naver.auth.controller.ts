import {
  Controller,
  Get,
  Post,
  Redirect,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { NaverAuthService } from './naver.auth.service';
import { Request, Response } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import { SessionService } from '../session/session.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth/naver')
export class NaverAuthController {
  constructor(
    private readonly naverAuthService: NaverAuthService,
    private readonly usersService: UsersService,
    private readonly sessionService: SessionService,
  ) {}

  @Get('callback')
  @Redirect()
  async callback() {
    const naverAuthUrl = this.naverAuthService.getNaverAuthUrl();
    return { url: naverAuthUrl };
  }

  @Post('user')
  async redirect(
    @Body('code') code: string,
    @Body('state') state: string,
    @Body('provider') provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const tokens = await this.naverAuthService.getToken(code, state);
      const userData = await this.naverAuthService.getUserInfo(
        tokens.access_token,
      );
      const foundUser = await this.naverAuthService.findUser(userData);

      if (foundUser.isExist) {
        const viaNaverUser = await this.usersService.findByAccountID(
          foundUser.id,
        );

        if (!viaNaverUser) {
          const newUserPayload = { ...foundUser, isExist: false };
          return res.send({
            message: '신규 유저 데이터',
            user: newUserPayload,
          });
        }

        const addedProviderViaNaverUser = { ...viaNaverUser, provider };

        try {
          await this.sessionService.loginWithSession(
            req,
            addedProviderViaNaverUser,
          );

          res.send({
            message: '기존 유저 데이터',
            user: { ...addedProviderViaNaverUser, isExist: true },
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
        user: foundUser,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      });
    } catch (error) {
      console.error('인증 처리 중 오류:', error);
      throw new HttpException(
        '인증 처리 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('user/update')
  async updateUser(
    @Body() userData,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const finalUser = await this.usersService.create({
        email: userData.email,
        name: userData.name,
        accountID: userData.id,
        phoneNumber: userData.phoneNumber,
      });

      if (userData.provider === 'naver') {
        await this.naverAuthService.updateUser(userData);
      }

      const mergedUser = { ...finalUser, provider: userData.provider };

      return res.send({
        message: '신규 가입 및 로그인 성공',
        user: { ...mergedUser, isExist: true },
        sessionId: req.sessionID,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        '회원가입 처리 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
