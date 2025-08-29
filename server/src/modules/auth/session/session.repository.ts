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

  async findBySessionId(sessionId: string): Promise<UserSession | null> {
    return await this.sessionRepository.findOne({
      where: { sessionId },
    });
  }

  async deleteBySessionId(sessionId: string): Promise<void> {
    await this.sessionRepository.delete({ sessionId });
  }
}
