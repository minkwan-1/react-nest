import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    const user = await this.sessionService.findWithSession(req);
    return user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.sessionService.logoutWithSession(req, res);
  }
}
