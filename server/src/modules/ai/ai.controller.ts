import {
  Controller,
  Get,
  Query,
  Param,
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
    @Query('questionId') questionId: string,
  ) {
    if (!title || !content || !questionId) {
      throw new HttpException(
        '질문 제목, 내용, questionId가 필요합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('AI 요청 수신됨 (title/content 기반)');
    console.log('title:', title);
    console.log('content:', content);
    console.log('questionId:', questionId);

    try {
      const questionIdNum = Number(questionId);
      const existing = await this.aiService.findByQuestionId(questionIdNum);
      if (existing) {
        return {
          success: true,
          data: {
            answer: existing.content,
            generatedAt: existing.createdAt,
            source: 'cached',
          },
        };
      }

      const aiAnswer = await this.aiService.generateAnswer(
        title,
        content,
        questionIdNum,
      );

      return {
        success: true,
        data: {
          answer: aiAnswer,
          generatedAt: new Date().toISOString(),
          source: 'generated',
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

  @Get('ask-ai/:questionId')
  async askAiById(@Param('questionId') questionId: string) {
    if (!questionId) {
      throw new HttpException(
        'questionId가 필요합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = Number(questionId);
    if (isNaN(id)) {
      throw new HttpException(
        '유효한 questionId가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('AI 요청 수신됨 (id 기반)');
    console.log('questionId:', id);

    try {
      const existing = await this.aiService.findByQuestionId(id);
      if (existing) {
        return {
          success: true,
          data: {
            answer: existing.content,
            generatedAt: existing.createdAt,
            source: 'cached',
          },
        };
      }

      const question = await this.aiService.findQuestionById(id);
      if (!question) {
        throw new HttpException(
          '질문을 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const aiAnswer = await this.aiService.generateAnswer(
        question.title,
        question.content,
        id,
      );

      return {
        success: true,
        data: {
          answer: aiAnswer,
          generatedAt: new Date().toISOString(),
          source: 'generated',
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
