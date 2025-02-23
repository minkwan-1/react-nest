import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoUser } from './kakao.auth.entity';

@Injectable()
export class KakaoAuthRepository {
  constructor(
    @InjectRepository(KakaoUser)
    private readonly kakaoUserRepository: Repository<KakaoUser>,
  ) {}

  // 1. 카카오 계정 ID로 기존 사용자 조회
  async findUserByAccountId(accountId: string): Promise<KakaoUser | null> {
    return await this.kakaoUserRepository.findOneBy({ id: accountId });
  }

  // 2. 신규 유저 생성
  async createNewUser(user: any): Promise<KakaoUser> {
    // 2.1. 연결된 날짜 처리
    const connectedAt = new Date(user.connectedAt);
    const validConnectedAt = isNaN(connectedAt.getTime())
      ? new Date()
      : connectedAt;

    // 2.2. 사용자 프로필 관련 값들 가져오기 (nickname, profileImage, thumbnailImage, isDefaultImage)
    const nickname = user.nickname || '익명';
    const profileImage = user.profileImage || '';
    const thumbnailImage = user.thumbnailImage || '';
    const isDefaultImage = user.isDefaultImage || false;

    // 2.3. 신규 유저 객체 생성
    const newUser = this.kakaoUserRepository.create({
      id: user.id,
      connectedAt: validConnectedAt,
      nickname,
      profileImage,
      thumbnailImage,
      isDefaultImage,
    });

    // 2.4. DB에 저장
    await this.kakaoUserRepository.save(newUser);
    console.log('New user created:', newUser);

    return newUser;
  }
}
