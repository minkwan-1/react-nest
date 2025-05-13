import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor() {}

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
