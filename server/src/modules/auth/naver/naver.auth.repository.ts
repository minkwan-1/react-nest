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

  // 네이버 사용자 ID로 사용자 조회
  async findUser(user: { id: string }): Promise<NaverUser> {
    return await this.naverUserRepository.findOne({
      where: { id: user.id },
    });
  }

  // 새로운 네이버 사용자 데이터를 DB에 저장
  async saveUser(userData: Partial<NaverUser>): Promise<NaverUser> {
    const user = this.naverUserRepository.create(userData);
    return await this.naverUserRepository.save(user);
  }
}
