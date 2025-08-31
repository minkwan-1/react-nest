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

  async findUser(user: { id: string }): Promise<NaverUser> {
    return await this.naverUserRepository.findOne({
      where: { id: user.id },
    });
  }

  async saveUser(userData: Partial<NaverUser>): Promise<NaverUser> {
    const user = this.naverUserRepository.create(userData);
    return await this.naverUserRepository.save(user);
  }

  async updateUser(userData: NaverUser): Promise<NaverUser> {
    await this.naverUserRepository.update(userData.id, { isExist: true });

    return { ...userData, isExist: true };
  }
}
