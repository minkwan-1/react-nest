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

  // 1. 유저 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, phoneNumber } = createUserDto;

    // 1-1. 이메일 중복 확인
    const emailExists = await this.findOneByEmail(email);
    if (emailExists) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    // 1-2. 전화번호 중복 확인
    const phoneExists = await this.findOneByPhoneNumber(phoneNumber);
    if (phoneExists) {
      throw new ConflictException('이미 등록된 전화번호입니다.');
    }

    try {
      // 1-3. 유저 객체 생성 후 저장
      const user = this.repository.create({ email, name, phoneNumber });
      return await this.repository.save(user);
    } catch (error) {
      console.error('User creation error:', error);
      throw new InternalServerErrorException(
        '회원가입 중 오류가 발생했습니다.',
      );
    }
  }

  // 2. 이메일로 유저 검색
  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  // 3. ID로 유저 검색
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  // 4. 전화번호로 유저 검색
  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.repository.findOne({ where: { phoneNumber } });
  }
}
