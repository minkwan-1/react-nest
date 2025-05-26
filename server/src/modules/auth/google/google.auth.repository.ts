import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from './google.auth.entity';

@Injectable()
export class GoogleAuthRepository {
  constructor(
    @InjectRepository(GoogleUser)
    private readonly googleUserRepository: Repository<GoogleUser>,
  ) {}

  // 구글 사용자 ID로 사용자 조회
  async findUser(user: { id: string }): Promise<GoogleUser> {
    return await this.googleUserRepository.findOne({
      where: { id: user.id },
    });
  }

  // 새로운 구글 사용자 데이터를 DB에 저장
  async saveUser(userData: Partial<GoogleUser>): Promise<GoogleUser> {
    const user = this.googleUserRepository.create(userData);

    return await this.googleUserRepository.save(user);
  }
}
