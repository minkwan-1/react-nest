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

  // 유저 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, phoneNumber, accountID } = createUserDto;

    // 중복 전화번호 체크
    const phoneExists = await this.findOneByPhoneNumber(phoneNumber);
    if (phoneExists) {
      throw new ConflictException('이미 등록된 전화번호입니다.');
    }

    // accountID로 GoogleUser 조회
    const googleAccount = await this.findGoogleUserById(accountID);
    if (!googleAccount) {
      throw new ConflictException('Google 계정을 찾을 수 없습니다.');
    }

    try {
      const user = this.repository.create({
        email,
        name,
        phoneNumber,
        googleAccount,
      });

      return await this.repository.save(user);
    } catch (error) {
      console.error('User creation error:', error);
      throw new InternalServerErrorException(
        '회원가입 중 오류가 발생했습니다.',
      );
    }
  }

  // accountID(GoogleUser ID)로 유저 조회
  async findOneByAccountID(accountID: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        googleAccount: { id: accountID },
      },
      relations: ['googleAccount'],
    });
  }

  // ID로 유저 검색
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  // 전화번호로 유저 검색
  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.repository.findOne({ where: { phoneNumber } });
  }

  // GoogleUser 엔티티에서 계정 ID로 조회
  private async findGoogleUserById(id: string): Promise<GoogleUser | null> {
    return this.repository.manager.findOne(GoogleUser, {
      where: { id },
    });
  }
}
