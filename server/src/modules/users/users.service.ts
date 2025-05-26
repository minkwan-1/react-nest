import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // 1. 생성자에서 UsersRepository 주입
  constructor(private readonly usersRepository: UsersRepository) {}

  // 2. 유저 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  // 3. 이메일로 유저 조회
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneByEmail(email);
  }

  // 4. ID로 유저 조회
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }
}
