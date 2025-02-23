import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverUser } from './naver.auth.entity';

@Injectable()
export class NaverAuthRepository {
  constructor(
    @InjectRepository(NaverUser)
    private readonly naverUserRepository: Repository<NaverUser>,
  ) {}

  // 1. 네이버 계정 ID로 기존 사용자 조회
  async findUserByAccountId(accountId: string): Promise<NaverUser | null> {
    return await this.naverUserRepository.findOneBy({ id: accountId });
  }

  // 2. 신규 유저 생성
  async createNewUser(user: any): Promise<NaverUser> {
    const connectedAt = new Date();

    // 프로필 및 이메일 처리
    const nickname = user.nickname || '익명';
    const profileImage = user.profileImage || '';
    const email = user.email || '';

    // 신규 유저 객체 생성
    const newUser = this.naverUserRepository.create({
      id: user.id,
      connectedAt,
      nickname,
      profileImage,
      email,
      name: user.name || '', // 이름은 선택적 필드
    });

    // DB에 저장
    await this.naverUserRepository.save(newUser);
    console.log('New user created:', newUser);

    return newUser;
  }
}
