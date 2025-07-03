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

  /**
   * 기존 방식: 프론트에서 title, content, questionId를 모두 전달
   * 예: GET /api/ask-ai?title=...&content=...&questionId=1
   */
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

      // 기존 답변이 존재하는지 확인
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

      // 새로 생성
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

  /**
   * 새로운 방식: 프론트에서는 questionId만 전달
   * 예: GET /api/ask-ai/1
   */
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
      // 1. 기존 답변 캐시 확인
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

      // 2. 질문 DB 조회
      const question = await this.aiService.findByQuestionId(id);
      if (!question) {
        throw new HttpException(
          '질문을 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      // 3. AI 답변 생성
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
