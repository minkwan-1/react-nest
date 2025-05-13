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

  // 세션에 저장할 유저 정보
  serializeUser(user: any, done: (err: any, id?: any) => void) {
    if (!user || !user.id) {
      return done(new Error('Invalid user object'));
    }

    const sessionData = {
      id: user.id,
      provider: user.provider || 'local',
    };

    done(null, sessionData);
  }

  // 세션에서 불러온 유저 정보로 실제 유저 조회
  async deserializeUser(
    payload: { id: string; provider: string },
    done: (err: any, user?: any) => void,
  ) {
    try {
      let user;

      if (payload.provider === 'google') {
        const googleUser = await this.googleAuthService.findUser(payload.id);
        if (!googleUser) return done(null, false);

        user = await this.usersService.findByEmail(googleUser.email);
        if (user) user.provider = 'google';
      } else if (payload.provider === 'naver') {
        const naverUser = await this.naverAuthService.findUser(payload.id);
        if (!naverUser) return done(null, false);

        user = await this.usersService.findByEmail(naverUser.email);
        if (user) user.provider = 'naver';
      } else {
        // 기본(local 등) 처리
        user = await this.usersService.findById(payload.id);
      }

      if (!user) return done(null, false);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
