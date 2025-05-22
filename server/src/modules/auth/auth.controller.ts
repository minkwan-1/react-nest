import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    const result = await this.sessionService.findWithSession(req);

    console.log('세션 기반 로그인 정보: ', result);

    return result;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.sessionService.logoutWithSession(req, res);
  }
}
