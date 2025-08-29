import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { CORS_ORIGIN, FRONTEND_URL, SESSION_SECRET, CSP_SCRIPT_SRC, PORT } =
    process.env;

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

  await app.listen(PORT || 3000);
}

bootstrap();
