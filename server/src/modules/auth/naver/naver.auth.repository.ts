import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverUser } from './naver.auth.entity';

// github 확인용3

@Injectable()
export class NaverAuthRepository {
  constructor(
    @InjectRepository(NaverUser)
    private readonly naverUserRepository: Repository<NaverUser>,
  ) {}

  // 1. 사용자 정보가 존재하는지 확인하고, 없으면 생성
  async findUser(user: { id: string }): Promise<NaverUser> {
    const existingUser = await this.naverUserRepository.findOneBy({
      id: user?.id,
    });
    return existingUser;
  }
}
