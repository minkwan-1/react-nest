// src/configs/typeorm.config.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

// --- 엔티티들을 모두 import 합니다 ---
import { Question } from 'src/modules/questions/questions.entity';
import { GoogleUser } from 'src/modules/auth/google/google.auth.entity';
import { NaverUser } from 'src/modules/auth/naver/naver.auth.entity';
import { PhoneVerification } from 'src/modules/phone/phone-verification.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UserSession } from 'src/modules/auth/session/session.entity';
import { SelfIntro } from 'src/modules/self-intro/self-intro.entity';
import { MyInfo } from 'src/modules/myInfo/myInfo.entity';
import { Answer } from 'src/modules/answer/answer.entity';
import { AiAnswer } from 'src/modules/ai/ai.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORT')),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        Question,
        GoogleUser,
        NaverUser,
        PhoneVerification,
        User,
        UserSession,
        SelfIntro,
        MyInfo,
        Answer,
        AiAnswer,
      ],
      synchronize: true,
      logging: true,
      // ssl:
      //   process.env.NODE_ENV === 'production'
      //     ? { rejectUnauthorized: false }
      //     : false,
    };
  }
}
