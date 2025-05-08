import { User } from 'src/users/entities/user.entity';

declare module 'express-session' {
  interface SessionData {
    user?: User; // 유저 타입에 맞게 수정
  }
}
