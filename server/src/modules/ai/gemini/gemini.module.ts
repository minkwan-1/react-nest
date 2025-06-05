import { Module } from '@nestjs/common';
import { OpenAIService } from './gemini.service';
import { OpenAIController } from './gemini.controller';

@Module({
  controllers: [OpenAIController],
  providers: [OpenAIService],
})
export class OpenAIModule {}
