// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { GoogleAuthService } from './google.auth.service';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(private readonly googleAuthService: GoogleAuthService) {
//     super({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       scope: ['email', 'profile'],
//       prompt: 'consent',
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { id, emails, name, photos } = profile;

//     // Format user data from Google profile
//     const userData = {
//       id,
//       email: emails[0].value,
//       verified_email: emails[0].verified,
//       name: `${name.givenName} ${name.familyName}`,
//       given_name: name.givenName,
//       family_name: name.familyName,
//       picture: photos[0].value,
//     };

//     // Check if user is valid (exists and has completed registration)
//     const isValid = await this.googleAuthService.isValidExistingUser(id);

//     if (isValid) {
//       // Find existing user
//       const existingUser = await this.googleAuthService.findUser(userData);

//       // Validate email matches
//       if (existingUser.email !== userData.email) {
//         return done(new Error('이메일이 일치하지 않습니다.'), null);
//       }

//       // Return user with tokens
//       return done(null, {
//         ...existingUser,
//         accessToken,
//         refreshToken,
//       });
//     } else {
//       // Create new user
//       const newUser = await this.googleAuthService.createUser(userData);
//       return done(null, {
//         ...newUser,
//         accessToken,
//         refreshToken,
//         registrationComplete: false,
//       });
//     }
//   }
// }
