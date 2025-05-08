import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { GoogleAuthService } from './google.auth.service';

@Injectable()
export class GoogleUserSerializer extends PassportSerializer {
  constructor(private readonly googleAuthService: GoogleAuthService) {
    super();
  }

  // 세션에 저장할 사용자 정보 직렬화
  serializeUser(user: any, done: (err: any, id?: any) => void) {
    console.log('serializer의 유저: ', user.id);
    done(null, user.id); // 사용자 ID만 세션에 저장
  }

  // 세션에서 사용자 정보 역직렬화
  async deserializeUser(userId: string, done: (err: any, user?: any) => void) {
    try {
      const userData = { id: userId };
      const user = await this.googleAuthService.findUser(userData);
      done(null, user); // 세션에서 찾은 사용자 데이터 반환
    } catch (error) {
      done(error, null);
    }
  }
}
