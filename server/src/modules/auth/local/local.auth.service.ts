import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface User {
  email: string;
  passwordHash: string;
}

@Injectable()
export class LocalAuthService {
  private users: User[] = [];

  async signup(email: string, password: string): Promise<User> {
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = { email, passwordHash };
    this.users.push(newUser);
    return { email, passwordHash };
  }

  async login(email: string, password: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new BadRequestException('잘못된 이메일입니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    return { email: user.email, passwordHash: user.passwordHash };
  }
}
