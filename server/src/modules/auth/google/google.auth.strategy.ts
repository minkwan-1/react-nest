// google.auth.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleAuthService } from './google.auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // 구글에서 받은 프로필 정보로 사용자 데이터 생성
    const userData = {
      id: profile.id,
      email: profile.emails[0].value,
      verified_email: profile.emails[0].verified,
      name: profile.displayName,
      given_name: profile.name.givenName,
      family_name: profile.name.familyName,
      picture: profile.photos[0].value,
    };

    // 구글 사용자 찾기
    const user = await this.googleAuthService.findUser(userData);

    // 구글 사용자 정보를 통해 최종 사용자 정보를 찾기
    if (user.isExist) {
      const viaGoogleUser = await this.usersService.findByEmail(user.email);
      return { ...viaGoogleUser, provider: 'google' };
    }

    // 신규 사용자인 경우
    return {
      message: '신규 유저 데이터',
      ...user,
      provider: 'google',
    };
  }
}
