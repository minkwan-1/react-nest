import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { GoogleAuthService } from './google.auth.service';

@Injectable()
export class GoogleUserSerializer extends PassportSerializer {
  constructor(private readonly googleAuthService: GoogleAuthService) {
    super();
  }

  // Serialize user to store in session
  serializeUser(user: any, done: (err: any, id?: any) => void) {
    done(null, user.id);
  }

  // Deserialize user from session ID
  async deserializeUser(userId: string, done: (err: any, user?: any) => void) {
    try {
      const userData = { id: userId };
      const user = await this.googleAuthService.findUser(userData);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
