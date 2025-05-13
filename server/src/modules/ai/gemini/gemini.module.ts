import { Module } from '@nestjs/common';

// 1. Gemini API 서비스 및 컨트롤러
import { GoogleGenerativeAIService } from './gemini.service';
import { GoogleGenerativeAIController } from './gemini.controller';

@Module({
  // HTTP 요청을 처리하는 컨트롤러
  controllers: [GoogleGenerativeAIController],

  // Gemini API 호출 로직을 담은 서비스
  providers: [GoogleGenerativeAIService],
})
export class GeminiModule {}
