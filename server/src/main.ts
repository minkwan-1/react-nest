import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';      // <-- 주석 처리
// import * as passport from 'passport';            // <-- 주석 처리

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SESSION_SECRET, CSP_SCRIPT_SRC,
  const { CORS_ORIGIN, FRONTEND_URL, PORT } = process.env;

  app.enableCors({
    origin: CORS_ORIGIN || FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use(cookieParser()); // <-- 이것은 남겨둡니다.

  /* <-- 여기서부터 주석 시작
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
        secure: false,
      },
    }),
  );

  app.use(passport.initialize());

  app.use(passport.session());

  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `script-src 'self' ${CSP_SCRIPT_SRC || ''} 'unsafe-eval';`,
    );
    next();
  });
  */ // <-- 여기까지 주석 끝

  await app.listen(PORT, () => {
    console.log('80번 포트에 연결됨!');
  });
}

bootstrap();
