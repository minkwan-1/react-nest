import { Module } from '@nestjs/common';

import { GoogleGenerativeAIService } from './gemini.service';
import { GoogleGenerativeAIController } from './gemini.controller';

@Module({
  controllers: [GoogleGenerativeAIController],
  providers: [GoogleGenerativeAIService],
})
export class GeminiModule {}
