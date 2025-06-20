import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('api')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('ask-ai')
  async askAi(
    @Query('title') title: string,
    @Query('content') content: string,
  ) {
    if (!title || !content) {
      throw new HttpException(
        '질문 제목과 내용이 필요합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const aiResponse = await this.aiService.generateAnswer(title, content);
      return {
        success: true,
        data: {
          answer: aiResponse,
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('AI 답변 생성 실패:', error);
      throw new HttpException(
        'AI 답변 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
