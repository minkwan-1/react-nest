import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserSession } from './session.entity';

@Injectable()
export class SessionRepository extends Repository<UserSession> {
  constructor(private dataSource: DataSource) {
    super(UserSession, dataSource.createEntityManager());
  }
  // 향후 동시 트랜잭션 처리 시 적용할 것
  //   async transactionSave(
  //     transactionManager: EntityManager,
  //     userSession: UserSession,
  //   ): Promise<UserSession> {
  //     return await transactionManager.save(userSession);
  //   }

  // 1. save session

  // 2. find session

  // 3. clear session
}
