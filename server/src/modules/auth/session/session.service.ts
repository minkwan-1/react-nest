import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { Request } from 'express';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  // 1. loginWithSession(=로그인)
  async loginWithSession(req: Request, user: any): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      (req as any).login(user, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const sessionId = req.sessionID;
    const userId = user.id;
    const provider = user.provider;
    const createdAt = new Date();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await this.sessionRepository.saveSession(
      sessionId,
      userId,
      provider,
      createdAt,
      expiresAt,
      user,
    );

    console.log(`세션 ID: ${req.sessionID}`);
    console.log('로그인 한 유저 정보: ', user);
  }

  // 2. findWithSession()
}
