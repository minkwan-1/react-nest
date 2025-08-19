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
    console.log(createUserDto);
    const { email, name, phoneNumber, accountID } = createUserDto;

    // 1. GoogleUser 존재 확인
    // const googleAccount = await this.findGoogleUserById(accountID);
    // if (!googleAccount) {
    //   throw new ConflictException(
    //     '연결할 Google 계정 정보를 찾을 수 없습니다. 인증을 다시 시도해주세요.',
    //   );
    // }

    try {
      // 2. User 생성
      const user = this.repository.create({
        email,
        name,
        phoneNumber,
        accountID, // ✅ 엔티티 자체를 넣어야 함
      });

      return await this.repository.save(user); // ✅ 단일 User 반환
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
      // relations: ['googleAccount'],
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
