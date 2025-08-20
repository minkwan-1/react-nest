import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { Request, Response } from 'express';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  async loginWithSession(req: Request, user: any): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        (req as any).login(user, (err: any) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      const sessionId = req.sessionID;

      await this.sessionRepository.saveSession(
        sessionId,
        user.id,
        user.provider,
        new Date(),
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        user,
      );
    } catch (error) {
      throw error;
    }
  }

  async findWithSession(req: Request): Promise<any> {
    const sessionId = req.sessionID;

    if (!sessionId) {
      return {
        isAuthenticated: false,
        user: null,
        sessionId: null,
        session: null,
      };
    }

    const sessionRecord =
      await this.sessionRepository.findBySessionId(sessionId);

    if (!sessionRecord) {
      return {
        isAuthenticated: false,
        user: null,
        sessionId,
        session: req.session,
      };
    }

    return {
      isAuthenticated: true,
      user: sessionRecord.data,
      sessionId,
      session: req.session,
    };
  }

  async logoutWithSession(req: Request, res: Response): Promise<void> {
    const sessionId = req.sessionID;

    try {
      if (sessionId) {
        await this.sessionRepository.deleteBySessionId(sessionId);
      }

      await new Promise<void>((resolve, reject) => {
        (req as any).logout((err: any) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: '세션 제거 실패' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: '로그아웃 성공' });
      });
    } catch (error) {
      console.log(error);
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(500).json({ message: '로그아웃 중 일부 오류 발생' });
      });
    }
  }
}
