import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { GoogleAuthService } from '../google/google.auth.service';
import { NaverAuthService } from '../naver/naver.auth.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UsersService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly naverAuthService: NaverAuthService,
  ) {
    super();
  }

  // 1. 세션에 저장할 유저 정보
  serializeUser(user: any, done: (err: any, id?: any) => void) {
    if (!user || !user.id) {
      // 2. 유효하지 않은 사용자 객체 처리
      return done(new Error('Invalid user object'));
    }
    // 3. 세션에 저장할 사용자 ID
    // 4. 프로바이더 정보
    const sessionData = {
      id: user.id,
      provider: user.provider,
    };
    // 5. 세션에 데이터 저장
    done(null, sessionData);
  }

  // 6. 세션에서 불러온 유저 정보로 실제 유저 조회
  // 7. 세션에서 불러온 payload
  // 8. 완료 콜백
  async deserializeUser(
    payload: { id: string; provider: string },
    done: (err: any, user?: any) => void,
  ) {
    try {
      let user;

      // 9. Google 또는 Naver 프로바이더에 따라 사용자 정보를 조회
      if (payload.provider === 'google') {
        const googleUser = await this.googleAuthService.findUser(payload.id);
        if (!googleUser) return done(null, false);

        user = await this.usersService.findByEmail(googleUser.email);
        // 10. 사용자 정보에 Google 프로바이더 추가
        if (user) user.provider = 'google';
      } else if (payload.provider === 'naver') {
        const naverUser = await this.naverAuthService.findUser(payload.id);
        if (!naverUser) return done(null, false);

        user = await this.usersService.findByEmail(naverUser.email);
        // 11. 사용자 정보에 Naver 프로바이더 추가
        if (user) user.provider = 'naver';
      } else {
        // 12. 일반적인 ID로 사용자 정보 조회
        user = await this.usersService.findById(payload.id);
      }
      // 13. 사용자 정보가 없으면 false 반환
      if (!user) return done(null, false);
      // 14. 사용자 정보 반환
      done(null, user);
    } catch (error) {
      // 15. 오류 처리
      done(error);
    }
  }
}
