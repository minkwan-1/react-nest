import { DataSource } from 'typeorm';
// import { Question } from './src/modules/questions/questions.entity';
import { GoogleUser } from './src/modules/auth/google/google.auth.entity';
import { NaverUser } from './src/modules/auth/naver/naver.auth.entity';
import { PhoneVerification } from './src/modules/phone/phone-verification.entity';
// import { User } from './src/modules/users/entities/user.entity';
import { UserSession } from './src/modules/auth/session/session.entity';
import { SelfIntro } from './src/modules/self-intro/self-intro.entity';
import { MyInfo } from './src/modules/myInfo/myInfo.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'react-nest',
  synchronize: false,
  logging: true, // 로깅 활성화
  entities: [
    // Question,
    GoogleUser,
    NaverUser,
    PhoneVerification,
    // User,
    UserSession,
    SelfIntro,
    MyInfo,
  ],
});
