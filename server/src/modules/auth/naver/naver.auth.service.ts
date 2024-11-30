import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverAuthService {
  private users = []; // 메모리에 유저 정보를 저장

  // 로그인한 유저 정보를 메모리에 저장
  async loginWithNaver(user: any) {
    this.users.push(user);
    return user;
  }

  // 유저 조회
  getUsers() {
    return this.users;
  }
}
