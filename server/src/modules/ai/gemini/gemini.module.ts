import { Module } from '@nestjs/common';

// 서비스 및 컨트롤러
import { GoogleGenerativeAIService } from './gemini.service';
import { GoogleGenerativeAIController } from './gemini.controller';

@Module({
  controllers: [GoogleGenerativeAIController],

  providers: [GoogleGenerativeAIService],
})
export class GeminiModule {}
