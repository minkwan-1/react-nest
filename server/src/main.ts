import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

// .env 파일 로드
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  console.log(httpAdapter);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // CORS 설정
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // CSP 설정
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `script-src 'self' ${process.env.CSP_SCRIPT_SRC};`,
    );
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
