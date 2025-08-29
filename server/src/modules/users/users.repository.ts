import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUser } from 'src/modules/auth/google/google.auth.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, phoneNumber, accountID } = createUserDto;

    try {
      const user = this.repository.create({
        email,
        name,
        phoneNumber,
        accountID,
      });

      return await this.repository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 가입된 Google 계정입니다.');
      }

      console.error('User creation error:', error);
      throw new InternalServerErrorException(
        '회원가입 처리 중 오류가 발생했습니다.',
      );
    }
  }

  async findOneByAccountID(accountID: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        accountID,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.repository.findOne({ where: { phoneNumber } });
  }

  private async findGoogleUserById(id: string): Promise<GoogleUser | null> {
    return this.repository.manager.findOne(GoogleUser, {
      where: { id },
    });
  }
}
