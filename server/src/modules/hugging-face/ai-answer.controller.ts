import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AiAnswerService } from './ai-answer.service';

export interface GenerateAnswerDto {
  title: string;
  content: string;
}

export interface GenerateAnswerResponse {
  answer: string;
  questionId: string;
  generatedAt: string;
}

@Controller('ai-answer')
export class AiAnswerController {
  constructor(private readonly aiAnswerService: AiAnswerService) {}

  @Post(':questionId')
  async generateAnswer(
    @Param('questionId') questionId: string,
    @Body() body: GenerateAnswerDto,
  ): Promise<GenerateAnswerResponse> {
    try {
      if (!body.title || !body.content) {
        throw new HttpException(
          '질문 제목과 내용이 필요합니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const answer = await this.aiAnswerService.generateAnswer(
        body.title,
        body.content,
      );

      return {
        answer,
        questionId,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('AI 답변 생성 컨트롤러 오류:', error);
      throw new HttpException(
        'AI 답변 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
