import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { GoogleUser } from './google.auth.entity';

@Injectable()
export class GoogleAuthRepository {
  private readonly logger = new Logger(GoogleAuthRepository.name);

  constructor(
    @InjectRepository(GoogleUser)
    private readonly googleUserRepository: Repository<GoogleUser>,
  ) {
    console.log('[1] GoogleAuthRepository 초기화됨');

    // 테이블 및 컬럼 메타데이터 로깅
    try {
      this.logger.log(
        `[1.1] 엔티티 이름: ${this.googleUserRepository.metadata.name}`,
      );
      this.logger.log(
        `[1.2] 테이블 이름: ${this.googleUserRepository.metadata.tableName}`,
      );
      this.googleUserRepository.metadata.columns.forEach((column) => {
        this.logger.log(
          `[1.3] 엔티티 컬럼: ${column.propertyName}, DB 컬럼명: ${column.databaseName}, 타입: ${column.type}`,
        );
      });
    } catch (error) {
      this.logger.error(`[1.4] 메타데이터 로깅 중 오류: ${error.message}`);
    }
  }

  async findUser(user: { id: string }): Promise<GoogleUser> {
    console.log('[26] findUser 메소드 호출됨. 찾을 ID:', user.id);
    try {
      // 쿼리를 로깅
      const queryBuilder = this.googleUserRepository.createQueryBuilder('gu');
      queryBuilder.where('gu.google_id = :id', { id: user.id });

      console.log('[26.1] 실행할 SQL 쿼리:', queryBuilder.getSql());
      console.log('[26.2] 쿼리 파라미터:', { id: user.id });

      const existingUser = await queryBuilder.getOne();

      console.log(
        '[28] 사용자 조회 결과:',
        existingUser ? '사용자 찾음' : '사용자 없음',
      );
      if (existingUser) {
        console.log(
          '[28.1] 조회된 사용자 정보:',
          JSON.stringify(existingUser, null, 2),
        );
      }

      return existingUser;
    } catch (error) {
      console.error('[28] 사용자 조회 중 오류 발생:', error.message);

      // 더 상세한 오류 정보 로깅
      if (error instanceof QueryFailedError) {
        console.error('[28.1] SQL 오류 코드:', (error as any).code);
        console.error('[28.2] SQL 오류 세부사항:', (error as any).detail);
        console.error('[28.3] SQL 쿼리:', (error as any).query);
      }

      console.error('[28.4] 오류 상세:', error.stack);
      throw error;
    }
  }

  async saveUser(userData: Partial<GoogleUser>): Promise<GoogleUser> {
    console.log(
      '[32] saveUser 메소드 호출됨. 데이터:',
      JSON.stringify(userData, null, 2),
    );
    try {
      console.log('[33] 사용자 엔티티 생성 시작');
      const user = this.googleUserRepository.create(userData);
      console.log('[33.1] 생성된 엔티티:', JSON.stringify(user, null, 2));

      // 엔티티 필드 대 테이블 컬럼 매핑 로깅
      this.googleUserRepository.metadata.columns.forEach((column) => {
        const propertyValue = user[column.propertyName];
        console.log(
          `[33.2] 매핑: ${column.propertyName}(${propertyValue}) -> ${column.databaseName}`,
        );
      });

      console.log('[34] 사용자 저장 시작');
      const savedUser = await this.googleUserRepository.save(user);
      console.log(
        '[34.1] 사용자 저장 완료:',
        JSON.stringify(savedUser, null, 2),
      );

      return savedUser;
    } catch (error) {
      console.error('[34.2] 사용자 저장 중 오류 발생:', error.message);

      // 더 상세한 오류 정보 로깅
      if (error instanceof QueryFailedError) {
        console.error('[34.3] SQL 오류 코드:', (error as any).code);
        console.error('[34.4] SQL 오류 세부사항:', (error as any).detail);
        console.error('[34.5] SQL 쿼리:', (error as any).query);
      }

      console.error('[34.6] 오류 상세:', error.stack);
      throw error;
    }
  }

  // 데이터베이스 테이블이 존재하는지 확인하는 메소드 추가
  async checkTableExists(): Promise<boolean> {
    try {
      console.log('[0.1] 테이블 존재 여부 확인 시작');
      const query = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'google_user'
        );
      `;

      // 네이티브 쿼리 실행
      const result = await this.googleUserRepository.query(query);
      const exists = result[0].exists;

      console.log(
        `[0.2] 테이블 존재 여부: ${exists ? '존재함' : '존재하지 않음'}`,
      );

      if (exists) {
        // 테이블 구조 확인
        const columnsQuery = `
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_name = 'google_user';
        `;
        const columns = await this.googleUserRepository.query(columnsQuery);
        console.log(
          '[0.3] 테이블 컬럼 정보:',
          JSON.stringify(columns, null, 2),
        );
      }

      return exists;
    } catch (error) {
      console.error('[0.4] 테이블 존재 여부 확인 중 오류:', error.message);
      return false;
    }
  }
}
