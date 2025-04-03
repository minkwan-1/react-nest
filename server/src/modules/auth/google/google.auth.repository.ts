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
    console.log('🟢 GoogleAuthRepository 초기화됨');

    // 테이블 및 컬럼 메타데이터 로깅
    try {
      this.logger.log(
        `🟢 엔티티 이름: ${this.googleUserRepository.metadata.name}`,
      );
      this.logger.log(
        `🟢 테이블 이름: ${this.googleUserRepository.metadata.tableName}`,
      );
      this.googleUserRepository.metadata.columns.forEach((column) => {
        this.logger.log(
          `🟢 엔티티 컬럼: ${column.propertyName}, DB 컬럼명: ${column.databaseName}, 타입: ${column.type}`,
        );
      });
    } catch (error) {
      this.logger.error(`🚨 메타데이터 로깅 중 오류: ${error.message}`);
    }
  }

  async findUser(user: { id: string }): Promise<GoogleUser> {
    console.log('🟢 findUser 메소드 호출됨. 찾을 ID:', user.id);
    try {
      // 먼저 테이블 구조 확인
      const columnsQuery = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'google_user';
      `;
      const columns = await this.googleUserRepository.query(columnsQuery);
      console.log('🟢 테이블 컬럼 정보:', JSON.stringify(columns, null, 2));

      // 기본 findOne 메소드 사용 (쿼리빌더 대신)
      console.log('🟢 기본 findOne 메소드로 사용자 조회 시작');
      const existingUser = await this.googleUserRepository.findOne({
        where: { id: user.id },
      });

      console.log(
        '🟢 사용자 조회 결과:',
        existingUser ? '사용자 찾음' : '사용자 없음',
      );
      if (existingUser) {
        console.log(
          '🟢 조회된 사용자 정보:',
          JSON.stringify(existingUser, null, 2),
        );
      }

      return existingUser;
    } catch (error) {
      console.error('🚨 사용자 조회 중 오류 발생:', error.message);

      // 더 상세한 오류 정보 로깅
      if (error instanceof QueryFailedError) {
        console.error('🚨 SQL 오류 코드:', (error as any).code);
        console.error(
          '🚨 SQL 오류 세부사항:',
          (error as any).detail || '상세 정보 없음',
        );
        console.error('🚨 SQL 쿼리:', (error as any).query || '쿼리 정보 없음');
      }

      // 더 안전한 스택 트레이스 로깅
      if (error.stack) {
        console.error('🚨 오류 스택:', error.stack);
      } else {
        console.error('🚨 스택 트레이스를 사용할 수 없습니다');
      }

      throw error;
    }
  }

  async saveUser(userData: Partial<GoogleUser>): Promise<GoogleUser> {
    console.log(
      '🟢 saveUser 메소드 호출됨. 데이터:',
      JSON.stringify(userData, null, 2),
    );
    try {
      console.log('🟢 사용자 엔티티 생성 시작');
      const user = this.googleUserRepository.create(userData);
      console.log('🟢 생성된 엔티티:', JSON.stringify(user, null, 2));

      // 엔티티 필드 대 테이블 컬럼 매핑 로깅
      this.googleUserRepository.metadata.columns.forEach((column) => {
        const propertyValue = user[column.propertyName];
        console.log(
          `🟢 매핑: ${column.propertyName}(${propertyValue}) -> ${column.databaseName}`,
        );
      });

      console.log('🟢 사용자 저장 시작');
      const savedUser = await this.googleUserRepository.save(user);
      console.log('🟢 사용자 저장 완료:', JSON.stringify(savedUser, null, 2));

      return savedUser;
    } catch (error) {
      console.error('🚨 사용자 저장 중 오류 발생:', error.message);

      // 더 상세한 오류 정보 로깅
      if (error instanceof QueryFailedError) {
        console.error('🚨 SQL 오류 코드:', (error as any).code);
        console.error(
          '🚨 SQL 오류 세부사항:',
          (error as any).detail || '상세 정보 없음',
        );
        console.error('🚨 SQL 쿼리:', (error as any).query || '쿼리 정보 없음');
      }

      // 더 안전한 스택 트레이스 로깅
      if (error.stack) {
        console.error('🚨 오류 스택:', error.stack);
      } else {
        console.error('🚨 스택 트레이스를 사용할 수 없습니다');
      }

      throw error;
    }
  }

  // 데이터베이스 테이블이 존재하는지 확인하는 메소드 추가
  async checkTableExists(): Promise<boolean> {
    try {
      console.log('🟢 테이블 존재 여부 확인 시작');
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
        `🟢 테이블 존재 여부: ${exists ? '존재함' : '존재하지 않음'}`,
      );

      if (exists) {
        // 테이블 구조 확인
        const columnsQuery = `
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_name = 'google_user';
        `;
        const columns = await this.googleUserRepository.query(columnsQuery);
        console.log('🟢 테이블 컬럼 정보:', JSON.stringify(columns, null, 2));
      }

      return exists;
    } catch (error) {
      console.error('🚨 테이블 존재 여부 확인 중 오류:', error.message);
      return false;
    }
  }

  // 필요한 경우 테이블을 생성하는 메소드 추가
  async createTableIfNotExists(): Promise<void> {
    try {
      const exists = await this.checkTableExists();

      if (!exists) {
        console.log('🟢 google_user 테이블이 존재하지 않아 생성합니다');

        const createTableQuery = `
          CREATE TABLE google_user (
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            verified_email BOOLEAN DEFAULT FALSE,
            name VARCHAR(255) NOT NULL,
            given_name VARCHAR(255) NOT NULL,
            family_name VARCHAR(255) NOT NULL,
            profile_image VARCHAR(255),
            is_default_image BOOLEAN DEFAULT FALSE,
            connected_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
        `;

        await this.googleUserRepository.query(createTableQuery);
        console.log('🟢 google_user 테이블이 성공적으로 생성되었습니다');
      }
    } catch (error) {
      console.error('🚨 테이블 생성 중 오류:', error.message);
      throw error;
    }
  }
}
