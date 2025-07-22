import { Injectable, Logger } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { Request, Response } from 'express';

@Injectable()
export class SessionService {
  // NestJS의 Logger 인스턴스 생성
  private readonly logger = new Logger(SessionService.name);

  constructor(private sessionRepository: SessionRepository) {}

  // [1] 로그인 처리 및 세션 저장
  async loginWithSession(req: Request, user: any): Promise<void> {
    this.logger.log(`[1] 🚀 세션 로그인 시작: User ID ${user.id}`);
    try {
      await new Promise<void>((resolve, reject) => {
        this.logger.log(`[1-1] Passport.js 'login' 실행 시도...`);
        (req as any).login(user, (err: any) => {
          if (err) {
            this.logger.error(`[1-1] ❌ Passport.js 'login' 실패`, err.stack);
            return reject(err);
          }
          this.logger.log(`[1-1] ✅ Passport.js 'login' 성공`);
          resolve();
        });
      });

      const sessionId = req.sessionID;
      this.logger.log(`[1-2] 🔑 세션 ID 발급 완료: ${sessionId}`);

      this.logger.log(`[1-3] 💾 세션 정보 DB 저장 시도...`);
      await this.sessionRepository.saveSession(
        sessionId,
        user.id,
        user.provider,
        new Date(),
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일 후 만료
        user,
      );
      this.logger.log(`[1-3] ✅ 세션 정보 DB 저장 성공`);
      this.logger.log(`[1] 🎉 세션 로그인 절차 완료: User ID ${user.id}`);
    } catch (error) {
      this.logger.error(`[1] ⚠️ 세션 로그인 중 심각한 오류 발생`, error.stack);
      throw error; // 에러를 상위로 전파
    }
  }

  // [2] 세션 기반 사용자 조회 (로그인 유지 여부 확인)
  async findWithSession(req: Request): Promise<any> {
    const sessionId = req.sessionID;
    this.logger.log(`[2] 🔎 세션 ID로 사용자 조회 시도: ${sessionId}`);

    if (!sessionId) {
      this.logger.warn(`[2] ⚠️ 요청에 세션 ID가 없습니다.`);
      return {
        isAuthenticated: false,
        user: null,
        sessionId: null,
        session: null,
      };
    }

    this.logger.log(`[2-1] 💾 DB에서 세션 조회: ${sessionId}`);
    const sessionRecord =
      await this.sessionRepository.findBySessionId(sessionId);

    if (!sessionRecord) {
      this.logger.warn(`[2-2] ⚠️ DB에 해당 세션 ID가 존재하지 않음`);
      return {
        isAuthenticated: false,
        user: null,
        sessionId,
        session: req.session,
      };
    }

    this.logger.log(
      `[2-2] ✅ 세션 ID로 사용자 인증 성공: User ID ${sessionRecord.data.id}`,
    );
    return {
      isAuthenticated: true,
      user: sessionRecord.data,
      sessionId,
      session: req.session,
    };
  }

  // [3] 로그아웃 처리: 세션 DB 삭제, Passport 로그아웃, 세션 파괴
  async logoutWithSession(req: Request, res: Response): Promise<void> {
    const sessionId = req.sessionID;
    this.logger.log(`[3] 🚀 로그아웃 절차 시작: Session ID ${sessionId}`);

    try {
      if (sessionId) {
        this.logger.log(`[3-1] 🗑️ 세션 DB 삭제 시도...`);
        await this.sessionRepository.deleteBySessionId(sessionId);
        this.logger.log(`[3-1] ✅ 세션 DB 삭제 완료`);
      }

      this.logger.log(`[3-2] Passport.js 'logout' 실행 시도...`);
      await new Promise<void>((resolve, reject) => {
        (req as any).logout((err: any) => {
          if (err) {
            this.logger.error(`[3-2] ❌ Passport.js 'logout' 실패`, err.stack);
            return reject(err);
          }
          this.logger.log(`[3-2] ✅ Passport.js 'logout' 성공`);
          resolve();
        });
      });

      this.logger.log(`[3-3] Express 세션 파괴 시도...`);
      req.session.destroy((err) => {
        if (err) {
          this.logger.error(`[3-3] ❌ Express 세션 파괴 실패`, err.stack);
          return res.status(500).json({ message: '세션 제거 실패' });
        }
        this.logger.log(`[3-3] ✅ Express 세션 파괴 완료`);
        res.clearCookie('connect.sid'); // 클라이언트 쿠키 제거
        this.logger.log(`[3] 🎉 로그아웃 절차 성공: Session ID ${sessionId}`);
        res.status(200).json({ message: '로그아웃 성공' });
      });
    } catch (error) {
      this.logger.error(`[3] ⚠️ 로그아웃 중 오류 발생`, error.stack);
      // 복구 로직: DB 삭제나 passport 로그아웃 중 에러가 나도 세션 파괴는 시도
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(500).json({ message: '로그아웃 중 일부 오류 발생' });
      });
    }
  }
}
