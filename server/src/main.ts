import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {
    CORS_ORIGIN,
    FRONTEND_URL,
    PORT = 3000,
    SESSION_SECRET,
    CSP_SCRIPT_SRC,
    NODE_ENV,
  } = process.env;

  const isProd = NODE_ENV === 'production';
  const allowedOrigin = CORS_ORIGIN || FRONTEND_URL || 'http://localhost:5173';

  // ✅ 기본 헬스체크 라우트
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/', (req, res) => {
    res.send('서버 연결 성공');
  });

  // ✅ CORS 설정
  app.enableCors({
    origin: allowedOrigin,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use(cookieParser());

  // ✅ 세션 설정
  app.use(
    session({
      secret: SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1일
        httpOnly: true,
        secure: isProd, // ⚠️ 프로덕션에서만 HTTPS 전용 쿠키
        sameSite: isProd ? 'none' : 'lax', // ✅ cross-site 요청 허용 (prod)
        domain: isProd ? '.pullim.io.kr' : undefined, // ✅ prod에서 서브도메인 쿠키 공유
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // ✅ CSP 헤더 (보안)
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `script-src 'self' ${CSP_SCRIPT_SRC || ''} 'unsafe-eval';`,
    );
    next();
  });

  await app.listen(PORT, () => {
    console.log(`✅ 서버가 ${PORT}번 포트에서 실행 중입니다`);
    console.log(`🌐 CORS 허용: ${allowedOrigin}`);
    console.log(`🔒 환경: ${isProd ? 'production' : 'development'}`);
  });
}

bootstrap();
