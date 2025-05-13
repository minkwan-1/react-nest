import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor() {}

  // 1. 사용자 정보 조회
  @Get('me')
  async getMe(@Req() req: Request) {
    // 2. 요청에서 사용자 정보 가져오기
    const user = (req as any).user;

    // 3. 사용자 인증 여부 확인
    const isAuthenticated = (req as any).isAuthenticated();

    console.log({ ...user }); // 4. 사용자 정보 로그 출력
    console.log(isAuthenticated); // 5. 인증 상태 로그 출력

    // 6. 사용자 정보와 인증 상태, 세션 정보 반환
    return {
      isAuthenticated,
      user,
      sessionId: req.sessionID,
      session: req.session,
    };
  }
}
