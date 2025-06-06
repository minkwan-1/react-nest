import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // [1] 유저 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  // [2] 이메일로 유저 조회
  async findByAccountID(accountID: string): Promise<User | null> {
    return this.usersRepository.findOneByAccountID(accountID);
  }

  // [3] ID로 유저 조회
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  // [4] 휴대전화번호로 유저 조회
  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOneByPhoneNumber(phoneNumber);
  }
}
