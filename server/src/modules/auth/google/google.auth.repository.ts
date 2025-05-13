import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from './google.auth.entity';

@Injectable()
export class GoogleAuthRepository {
  constructor(
    // 1. GoogleUser 엔티티를 통해 구글 사용자 정보를 다루기 위한 리포지토리 주입
    @InjectRepository(GoogleUser)
    private readonly googleUserRepository: Repository<GoogleUser>,
  ) {}

  // 2. 구글 사용자 ID로 사용자 조회
  async findUser(user: { id: string }): Promise<GoogleUser> {
    return await this.googleUserRepository.findOne({
      // 3. ID를 기준으로 사용자 검색
      where: { id: user.id },
    });
  }

  // 4. 새로운 구글 사용자 데이터를 DB에 저장
  async saveUser(userData: Partial<GoogleUser>): Promise<GoogleUser> {
    // 5. 사용자 엔티티 생성
    const user = this.googleUserRepository.create(userData);
    // 6. DB에 저장
    return await this.googleUserRepository.save(user);
  }
}
