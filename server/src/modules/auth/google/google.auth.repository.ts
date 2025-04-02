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

  async findUser(user: { id: number }): Promise<GoogleUser> {
    const existingUser = await this.googleUserRepository.findOneBy({
      id: user.id,
    });

    return existingUser;
  }
}
