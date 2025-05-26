import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserSession } from './session.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(UserSession)
    private readonly sessionRepository: Repository<UserSession>,
  ) {}

  // [1] 로그인 시 세션 정보를 DB에 저장하거나 업데이트
  async saveSession(
    sessionId: string,
    userId: string,
    provider: string,
    createdAt: Date,
    expiresAt: Date,
    data?: any,
  ): Promise<UserSession> {
    try {
      const existingSession = await this.sessionRepository.findOne({
        where: { sessionId },
      });

      if (existingSession) {
        Object.assign(existingSession, {
          userId,
          provider,
          createdAt,
          expiresAt,
          data,
        });
        return await this.sessionRepository.save(existingSession);
      }

      const session = this.sessionRepository.create({
        sessionId,
        userId,
        provider,
        createdAt,
        expiresAt,
        data,
      });

      return await this.sessionRepository.save(session);
    } catch (error) {
      console.error('❌ 세션 저장 중 오류:', error);
      throw new Error(`세션 저장 실패: ${error.message}`);
    }
  }

  // [2] 세션 ID로 세션 정보 조회
  async findBySessionId(sessionId: string): Promise<UserSession | null> {
    return await this.sessionRepository.findOne({
      where: { sessionId },
    });
  }

  // [3] 로그아웃 시 세션 삭제
  async deleteBySessionId(sessionId: string): Promise<void> {
    console.log('🗑️ 세션 삭제 요청 sessionId:', sessionId);
    await this.sessionRepository.delete({ sessionId });
  }
}
