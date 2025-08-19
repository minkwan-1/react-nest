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

  // [GET] 네이버 로그인 URL 제공
  @Get('callback')
  @Redirect()
  async callback() {
    const naverAuthUrl = this.naverAuthService.getNaverAuthUrl();
    return { url: naverAuthUrl };
  }

  // [POST] 네이버 로그인 콜백: 사용자 식별 및 세션 처리
  @Post('user')
  async redirect(
    @Body('code') code: string,
    @Body('state') state: string,
    @Body('provider') provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('state 확인: ', state);

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

        const addedProviderViaNaverUser = { ...viaNaverUser, provider };
        console.log('2', addedProviderViaNaverUser);
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

  // [POST] 사용자 정보 저장 (최초 회원가입 처리)
  @Post('user/update')
  async updateUser(
    @Body() userData,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('네이버 유저 데이터: ', userData);
    try {
      const finalUser = await this.usersService.create({
        email: userData.email,
        name: userData.name,
        accountID: userData.id,
        phoneNumber: userData.phoneNumber,
      });
      const mergedUser = { ...finalUser, provider: userData.provider };
      // await this.sessionService.loginWithSession(req, mergedUser);

      return res.send({
        message: '신규 가입 및 로그인 성공',
        user: { ...mergedUser, isExist: true }, // isExist를 true로 설정
        sessionId: req.sessionID,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        '회원가입 처리 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // const finalNaverUser = await this.naverAuthService.createUser(userData);

    // const parseFinalUser = {
    //   email: userData.email,
    //   name: userData.name,
    //   accountID: userData.id,
    //   phoneNumber: userData.phoneNumber,
    // };

    // const finalUser = await this.usersService.create(parseFinalUser);

    // return {
    //   finalNaverUser,
    //   finalUser,
    // };
  }
}
