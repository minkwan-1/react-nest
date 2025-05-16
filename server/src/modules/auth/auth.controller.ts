import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    (req as any).logout(() => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: '세션 제거 실패' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: '로그아웃 성공' });
      });
    });
  }
}
