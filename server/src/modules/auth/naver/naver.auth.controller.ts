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
import { UsersService } from 'src/users/users.service';

@Controller('auth/naver')
export class NaverAuthController {
  constructor(
    private readonly naverAuthService: NaverAuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('login')
  @Redirect()
  async login() {
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
    const tokens = await this.naverAuthService.getToken(code, state);

    const userData = await this.naverAuthService.getUserInfo(
      tokens.access_token,
    );

    const foundUser = await this.naverAuthService.findUser(userData);

    console.log('유저: ', foundUser);

    if (foundUser.isExist) {
      const viaNaverUser = await this.usersService.findByEmail(foundUser.email);

      const addedProviderViaNaverUser = { ...viaNaverUser, provider };

      (req as any).login(addedProviderViaNaverUser, () => {
        const user = (req as any).user;

        console.log(user);

        res.send({
          message: '기존 유저 데이터',
          user: { ...addedProviderViaNaverUser, isExist: true },
        });
      });
    } else {
      return {
        message: '신규 유저 데이터',
        user: foundUser,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
      };
    }
  }

  @Post('user/update')
  async updateUser(@Body() userData) {
    // 1. 네이버 유저 테이블 만들기
    const finalNaverUser = await this.naverAuthService.createUser(userData);

    // 2. 최종 유저 테이블 만들기
    const parseFinalUser = {
      email: userData.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
    };

    const finalUser = await this.usersService.create(parseFinalUser);

    return {
      finalNaverUser,
      finalUser,
    };
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    const user = (req as any).user;
    const isAuthenticated = (req as any).isAuthenticated();

    console.log({ ...user });
    console.log(isAuthenticated);

    return {
      isAuthenticated,
      user,
      sessionId: req.sessionID,
      session: req.session,
    };
  }
}
