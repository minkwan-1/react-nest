import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // JWT 토큰을 사용
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // 사용자 로그인 (간단한 이메일과 비밀번호로 로그인)
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = this.usersService.findByEmail(email);

    if (user && user.password === password) {
      // 단순한 비밀번호 검증 (암호화 안 함)
      return user;
    }
    return null;
  }

  // JWT 토큰 발급
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }),
    };
  }
}
