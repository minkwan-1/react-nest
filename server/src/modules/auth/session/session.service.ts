// src/sessions/sessions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionRepository } from './session.repository';
import { UserSession } from './session.entity';
import { Request } from 'express';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private sessionRepository: SessionRepository,
  ) {}

  // 1. loginWithSession()
  async loginWithSession(req: Request, user: any): Promise<void> {
    return new Promise((resolve, reject) => {
      (req as any).login(user, (err: any) => {
        if (err) {
          reject(err);
        } else {
          console.log(`세션 ID: ${req.sessionID}`);
          console.log('로그인 한 유저 정보: ', user);
          resolve();
        }
      });
    });
  }
}
