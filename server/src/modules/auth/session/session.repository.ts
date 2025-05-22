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

  // 1. saveSession(= 로그인 시 세션 정보를 DB에 저장하는 로직)
  async saveSession(
    sessionId: string,
    userId: string,
    provider: string,
    createdAt: Date,
    expiresAt: Date,
    data?: any,
  ): Promise<UserSession> {
    try {
      // 기존 세션이 있는지 확인
      const existingSession = await this.sessionRepository.findOne({
        where: { sessionId },
      });

      if (existingSession) {
        // 기존 세션 업데이트
        existingSession.userId = userId;
        existingSession.provider = provider;
        existingSession.createdAt = createdAt;
        existingSession.expiresAt = expiresAt;
        existingSession.data = data;
        return await this.sessionRepository.save(existingSession);
      }

      // 새 세션 생성
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
      console.error('세션 저장 중 오류 발생:', error);
      throw new Error(`세션 저장에 실패했습니다: ${error.message}`);
    }
  }

  // 2. findBySessionId(= protected info 요청시 세션을 찾는 로직)
  async findBySessionId(sessionId: string): Promise<UserSession | null> {
    return await this.sessionRepository.findOne({
      where: { sessionId },
    });
  }

  // 3. deleteBySessionId(= 로그아웃 시 세션 삭제)
  async deleteBySessionId(sessionId: string): Promise<void> {
    console.log('세션 삭제를 위한 sessionId가 들어왔는지: ', sessionId);
    await this.sessionRepository.delete({ sessionId });
  }
}
