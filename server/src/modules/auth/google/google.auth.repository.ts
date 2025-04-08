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

  async findUser(user: { id: string }): Promise<GoogleUser> {
    try {
      return await this.googleUserRepository.findOne({
        where: { id: user.id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findUserByRefreshToken(
    refreshToken: string,
  ): Promise<GoogleUser | null> {
    try {
      return await this.googleUserRepository.findOne({
        where: { refreshToken },
      });
    } catch (error) {
      throw error;
    }
  }

  async saveUser(userData: Partial<GoogleUser>): Promise<GoogleUser> {
    try {
      const user = this.googleUserRepository.create(userData);
      return await this.googleUserRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    try {
      await this.googleUserRepository.update({ id: userId }, { refreshToken });
    } catch (error) {
      throw error;
    }
  }
}
