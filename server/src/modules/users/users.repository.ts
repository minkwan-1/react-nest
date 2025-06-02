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
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // 유저 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, phoneNumber, accountID } = createUserDto;

    // const accountIDExists = await this.findOneByAccountID(accountID);
    // if (accountIDExists) {
    //   throw new ConflictException('이미 등록된 이메일입니다.');
    // }

    const phoneExists = await this.findOneByPhoneNumber(phoneNumber);
    if (phoneExists) {
      throw new ConflictException('이미 등록된 전화번호입니다.');
    }

    try {
      const user = this.repository.create({
        email,
        name,
        phoneNumber,
        accountID,
      });
      return await this.repository.save(user);
    } catch (error) {
      console.error('User creation error:', error);
      throw new InternalServerErrorException(
        '회원가입 중 오류가 발생했습니다.',
      );
    }
  }

  // 이메일로 유저 검색
  async findOneByAccountID(accountID: string): Promise<User | null> {
    return this.repository.findOne({ where: { accountID } });
  }

  // ID로 유저 검색
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  // 전화번호로 유저 검색
  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.repository.findOne({ where: { phoneNumber } });
  }
}
