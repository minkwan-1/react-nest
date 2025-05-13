// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-google-oauth20';
// import { GoogleAuthService } from './google.auth.service';
// import { UsersService } from 'src/users/users.service';
// import { Logger } from '@nestjs/common';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly googleAuthService: GoogleAuthService,
//     private readonly usersService: UsersService,
//   ) {
//     super({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       scope: ['profile', 'email'],
//     });
//   }

//   async validate(accessToken: string, refreshToken: string, profile: Profile) {
//     const logger = new Logger(GoogleStrategy.name);

//     // 구글에서 받은 프로필 정보로 사용자 데이터 생성
//     logger.log('GoogleStrategy: validate 호출됨');
//     logger.log('구글 프로필:', profile);

//     const userData = {
//       id: profile.id,
//       email: profile.emails[0].value,
//       verified_email: profile.emails[0].verified,
//       name: profile.displayName,
//       given_name: profile.name.givenName,
//       family_name: profile.name.familyName,
//       picture: profile.photos[0].value,
//     };

//     // 구글 사용자 찾기
//     const user = await this.googleAuthService.findUser(userData);
//     logger.log('구글 사용자 확인 결과:', user);

//     if (user.isExist) {
//       const viaGoogleUser = await this.usersService.findByEmail(user.email);
//       logger.log('기존 사용자:', viaGoogleUser);
//       return { ...viaGoogleUser, provider: 'google' };
//     }

//     logger.log('신규 사용자');
//     return {
//       message: '신규 유저 데이터',
//       ...user,
//       provider: 'google',
//     };
//   }
// }
