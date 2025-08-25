import { Controller, Get, Req, Res, Post, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';
import { AuthenticatedGuard } from './guard/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    console.log((req as any).isAuthenticated());
    const user = await this.sessionService.findWithSession(req);
    console.log('유저: ', user);
    return user;
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.sessionService.logoutWithSession(req, res);
  }
}
