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

  async findUser(user: { id: string }): Promise<NaverUser | null> {
    try {
      return await this.naverUserRepository.findOne({
        where: { id: user.id },
      });
    } catch (error) {
      throw error;
    }
  }

  async saveUser(userData: Partial<NaverUser>): Promise<NaverUser> {
    try {
      await this.naverUserRepository.upsert(userData, ['id']);
      return await this.naverUserRepository.findOneOrFail({
        where: { id: userData.id },
      });
    } catch (error) {
      throw error;
    }
  }
}
