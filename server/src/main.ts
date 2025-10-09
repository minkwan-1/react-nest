import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS_ORIGIN, FRONTEND_URL,
  const { CORS_ORIGIN, FRONTEND_URL, PORT, SESSION_SECRET, CSP_SCRIPT_SRC } =
    process.env;

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/', (req, res) => {
    res.send('서버 연결 성공');
  });
  app.enableCors({
    origin: CORS_ORIGIN || FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      // domains

      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        // secure: false,
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

  await app.listen(PORT, () => {
    console.log('80번 포트에 연결됨!');
  });
}

bootstrap();
