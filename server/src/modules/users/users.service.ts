import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async findByAccountID(accountID: string): Promise<User | null> {
    return this.usersRepository.findOneByAccountID(accountID);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOneByPhoneNumber(phoneNumber);
  }
}
