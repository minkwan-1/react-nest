import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiAnswerService } from './ai-answer.service';
import { AiAnswerController } from './ai-answer.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000, // 30초 타임아웃
      maxRedirects: 5,
    }),
  ],
  controllers: [AiAnswerController],
  providers: [AiAnswerService],
  exports: [AiAnswerService],
})
export class AiAnswerModule {}
