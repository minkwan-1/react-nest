// src/sessions/sessions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionRepository } from './session.repository';
import { UserSession } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private sessionRepository: SessionRepository,
  ) {}

  // 1. save session(로그인)

  // 2. find session(유저 정보 조회)

  // 3. clear session(로그아웃)
}
