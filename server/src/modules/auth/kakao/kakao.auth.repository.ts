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

  // 1. 사용자 정보가 존재하는지 확인하고, 없으면 생성
  async findUser(user: { id: number }): Promise<KakaoUser> {
    const existingUser = await this.kakaoUserRepository.findOneBy({
      id: user.id,
    });

    return existingUser;
  }
}
