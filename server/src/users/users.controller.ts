// src/users/users.controller.ts
import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

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
    const user = await this.usersService.findByPhoneNumber(phoneNumber);

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
