// src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, phoneNumber } = createUserDto;

    // Check if user with email already exists
    const emailExists = await this.usersRepository.findOne({
      where: { email },
    });
    if (emailExists) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    // Check if user with phone number already exists
    const phoneExists = await this.usersRepository.findOne({
      where: { phoneNumber },
    });
    if (phoneExists) {
      throw new ConflictException('이미 등록된 전화번호입니다.');
    }

    try {
      const user = this.usersRepository.create({
        email,
        name,
        phoneNumber,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('User creation error:', error);
      throw new InternalServerErrorException(
        '회원가입 중 오류가 발생했습니다.',
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.usersRepository.findOne({ where: { phoneNumber } });
  }
}
