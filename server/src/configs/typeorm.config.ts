import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Question } from 'src/modules/questions/questions.entity';
import { GoogleUser } from 'src/modules/auth/google/google.auth.entity';
import { NaverUser } from 'src/modules/auth/naver/naver.auth.entity';
import { KakaoUser } from 'src/modules/auth/kakao/kakao.auth.entity';
import { PhoneVerification } from 'src/modules/phone/phone-verification.entity';
import { User } from 'src/users/entities/user.entity';
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'react-nest',
  entities: [
    Question,
    GoogleUser,
    NaverUser,
    KakaoUser,
    PhoneVerification,
    User,
  ],
  synchronize: true, // 개발 환경에서만 true (프로덕션에서는 false로 설정)
};
