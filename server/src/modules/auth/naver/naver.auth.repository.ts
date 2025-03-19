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
  // FSDFDS
  // 1. 사용자 정보가 존재하는지 확인하고, 없으면 생성
  async findUser(user: { id: string }): Promise<NaverUser> {
    console.log('깃허브 테스트용3333:', user);
    const existingUser = await this.naverUserRepository.findOneBy({
      id: user?.id,
    });
    return existingUser;
  }
}
