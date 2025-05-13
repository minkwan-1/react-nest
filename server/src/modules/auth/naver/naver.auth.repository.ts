import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverUser } from './naver.auth.entity';

@Injectable()
export class NaverAuthRepository {
  constructor(
    // 1. NaverUser 엔티티를 통해 구글 사용자 정보를 다루기 위한 리포지토리 주입
    @InjectRepository(NaverUser)
    private readonly naverUserRepository: Repository<NaverUser>,
  ) {}

  // 2. 네이버 사용자 ID로 사용자 조회
  async findUser(user: { id: string }): Promise<NaverUser> {
    return await this.naverUserRepository.findOne({
      // 3. ID를 기준으로 사용자 검색
      where: { id: user.id },
    });
  }

  // 4. 새로운 네이버 사용자 데이터를 DB에 저장
  async saveUser(userData: Partial<NaverUser>): Promise<NaverUser> {
    // 5. 사용자 엔티티 생성
    const user = this.naverUserRepository.create(userData);
    // 6. DB에 저장
    return await this.naverUserRepository.save(user);
  }
}
