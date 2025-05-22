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
