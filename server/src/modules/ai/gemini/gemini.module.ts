import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleGenerativeAIService } from './gemini.service';
import { GoogleGenerativeAIController } from './gemini.controller';

@Module({
  imports: [HttpModule],
  controllers: [GoogleGenerativeAIController],
  providers: [GoogleGenerativeAIService],
})
export class GeminiModule {}
