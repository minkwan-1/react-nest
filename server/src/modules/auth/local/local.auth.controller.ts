import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const users: { email: string; passwordHash: string }[] = [];

@Controller('auth')
export class AuthController {
  // 회원가입
  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = { email, passwordHash };
    users.push(newUser);
    console.log('New user registered:', newUser);

    return { message: '회원가입 성공', user: { email } };
  }

  // 로그인
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new BadRequestException('잘못된 이메일입니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    console.log('User logged in:', user);

    return { message: '로그인 성공', user: { email: user.email } };
  }
}
