// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { HttpAdapterHost } from '@nestjs/core';
// import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

// .env 파일 로드
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // CORS 설정
  app.enableCors({
    origin:
      process.env.CORS_ORIGIN ||
      process.env.FRONTEND_URL ||
      'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // session 설정
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24, // 24시간
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 배포 시 secure 쿠키 사용
      },
    }),
  );

  // cookie-parser 적용
  app.use(cookieParser());

  // passport 초기화 및 세션 적용
  app.use(passport.initialize());
  app.use(passport.session());

  // CSP(Content-Security-Policy) 설정
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `script-src 'self' ${process.env.CSP_SCRIPT_SRC || ''};`,
    );
    next();
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
