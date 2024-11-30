import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // 사용자를 저장할 배열

  // 이메일로 사용자 찾기
  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  // 사용자 생성 (create 메서드 추가)
  create(user: User): User {
    this.users.push(user);
    return user; // 생성된 사용자 반환
  }
}
