import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserSession } from './session.entity';

@Injectable()
export class SessionRepository extends Repository<UserSession> {
  constructor(private dataSource: DataSource) {
    super(UserSession, dataSource.createEntityManager());
  }

  // 1. save session(로그인)
  saveSession(
    sessionId: string,
    userId: string,
    provider: string,
    createdAt: Date,
    expiresAt: Date,
    data?: any,
  ): Promise<UserSession> {
    const session = new UserSession();
    session.sessionId = sessionId;
    session.userId = userId;
    session.provider = provider;
    session.createdAt = createdAt;
    session.expiresAt = expiresAt;
    session.data = data;
    return this.save(session);
  }
  // 2. find session(유저 정보 조회)

  // 3. clear session(로그아웃)
}
