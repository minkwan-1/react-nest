import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { GoogleAuthService } from './google.auth.service';

@Injectable()
export class GoogleUserSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UsersService,
    private readonly googleAuthService: GoogleAuthService,
  ) {
    super();
  }

  // 유저 객체를 세션에 저장
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

  async deserializeUser(
    payload: { id: string; provider: string },
    done: (err: any, user?: any) => void,
  ) {
    try {
      let user;

      if (payload.provider === 'google') {
        const googleUser = await this.googleAuthService.findUser(payload.id);

        if (!googleUser) {
          return done(null, false);
        }

        user = await this.usersService.findByEmail(googleUser.email);

        if (user) {
          user.provider = 'google';
        }
      } else {
        user = await this.usersService.findById(payload.id);
      }

      if (!user) {
        return done(null, false);
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
