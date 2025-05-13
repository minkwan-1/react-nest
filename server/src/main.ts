import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

// 0. 환경변수 로드
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS 설정
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // 2. 쿠키 파서 등록
  app.use(cookieParser());

  // 3. 세션 설정
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
        secure: false, // HTTPS 전용 여부 (배포 시 true로)
      },
    }),
  );

  // 4. Passport 초기화 및 세션 연결
  app.use(passport.initialize());
  app.use(passport.session());

  // 5. Content-Security-Policy 설정
  app.use((res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `script-src 'self' ${process.env.CSP_SCRIPT_SRC || ''} 'unsafe-eval';`,
    );
    next();
  });

  // 6. 서버 시작
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
