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
    return await this.googleUserRepository.findOne({
      where: { id: user.id },
    });
  }

  async saveUser(userData: Partial<GoogleUser>): Promise<GoogleUser> {
    const user = this.googleUserRepository.create(userData);
    return await this.googleUserRepository.save(user);
  }

  // async updateUserRegistrationStatus(
  //   id: string,
  //   registrationComplete: boolean,
  // ): Promise<GoogleUser> {
  //   await this.googleUserRepository.update({ id }, { registrationComplete });
  //   return await this.googleUserRepository.findOne({ where: { id } });
  // }
}
