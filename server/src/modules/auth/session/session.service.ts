import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { Request, Response } from 'express';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  // 1. loginWithSession(= 로그인)
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

    console.log(`최초 로그인 세션 ID: ${req.sessionID}`);
    console.log('로그인 한 유저 정보: ', user);
  }

  // 2. findWithSession(= protected info, 사실상 로그인 유지)
  async findWithSession(req: Request): Promise<any> {
    const sessionId = req.sessionID;

    console.log(`Find 시  세션 ID: `, sessionId);

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

    console.log('찾아낸 세션 정보: ', sessionRecord);

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
  // 3. logoutWithSession(= 로그아웃) - 수정된 버전
  async logoutWithSession(req: Request, res: Response): Promise<void> {
    // 세션 ID와 사용자 정보를 미리 저장 (중요!)
    const sessionId = req.sessionID;

    try {
      // 1. 먼저 DB에서 세션 삭제 (세션이 변경되기 전에)
      if (sessionId) {
        console.log('DB에서 세션 삭제 시도:', sessionId);
        await this.sessionRepository.deleteBySessionId(sessionId);
        console.log(`DB 세션 삭제 완료: ${sessionId}`);
      }

      // 2. Passport 로그아웃
      await new Promise<void>((resolve, reject) => {
        (req as any).logout((err: any) => {
          if (err) {
            console.error('Passport 로그아웃 실패:', err);
            reject(err);
          } else {
            console.log('Passport 로그아웃 완료');
            resolve();
          }
        });
      });

      // 3. 세션 destroy
      req.session.destroy((err) => {
        if (err) {
          console.error('세션 destroy 실패:', err);
          res.status(500).json({ message: '세션 제거 실패' });
          return;
        }

        console.log('세션 destroy 완료');
        res.clearCookie('connect.sid');
        res.status(200).json({ message: '로그아웃 성공' });
      });
    } catch (error) {
      console.error('로그아웃 과정에서 오류:', error);

      // DB 삭제는 실패했어도 클라이언트 세션은 정리
      req.session.destroy((err) => {
        if (err) {
          console.error('세션 destroy도 실패:', err);
        }
        res.clearCookie('connect.sid');
        res.status(500).json({ message: '로그아웃 중 일부 오류 발생' });
      });
    }
  }
}
