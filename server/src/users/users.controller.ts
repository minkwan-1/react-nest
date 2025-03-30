// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepository: Repository<User>, // Repository 주입
  ) {}

  // 회원가입
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    // 이메일이나 전화번호가 이미 존재하는지 확인
    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const existingPhoneNumber = await this.userRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });

    if (existingEmail) {
      throw new ConflictException('이메일이 이미 등록되어 있습니다.');
    }
    if (existingPhoneNumber) {
      throw new ConflictException('전화번호가 이미 등록되어 있습니다.');
    }

    const user = this.userRepository.create(createUserDto); // DTO로부터 엔티티 생성
    await this.userRepository.save(user); // DB에 저장

    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입이 완료되었습니다.',
      data: {
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    };
  }

  // 전화번호로 유저 찾기
  @Get('find-user/:phoneNumber')
  async findUserByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: '해당 전화번호로 등록된 유저가 없습니다.',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
