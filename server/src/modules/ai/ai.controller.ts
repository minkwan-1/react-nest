import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
  Sse,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface MessageEvent {
  data: string | object;
}

@Controller('api')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Sse('ask-ai/stream/:questionId')
  async streamAskAiById(
    @Param('questionId') questionId: string,
  ): Promise<Observable<MessageEvent>> {
    const id = Number(questionId);
    if (isNaN(id)) {
      throw new HttpException(
        '유효한 questionId가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.aiService.findByQuestionId(id);

    if (existing) {
      return new Observable<MessageEvent>((subscriber) => {
        subscriber.next({
          data: JSON.stringify({ type: 'COMPLETE', payload: existing }),
        });
        subscriber.complete();
      });
    }

    const question = await this.aiService.findQuestionById(id);
    if (!question) {
      throw new HttpException('질문을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }

    return this.aiService
      .generateAnswerStream(question.title, question.content, id)
      .pipe(
        map((event) => ({ data: JSON.stringify(event) })),
        tap((event) => console.log('SSE로 전송될 이벤트:', event.data)),
      );
  }

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

    try {
      const questionIdNum = Number(questionId);
      const existing = await this.aiService.findByQuestionId(questionIdNum);

      if (existing) {
        return {
          success: true,
          data: { answer: existing.content, source: 'cached' },
        };
      }

      const aiAnswer = await this.aiService.generateAnswer(
        title,
        content,
        questionIdNum,
      );

      return { success: true, data: { answer: aiAnswer, source: 'generated' } };
    } catch (error) {
      console.error('AI 답변 생성 실패:', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'AI 답변 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('ask-ai/:questionId')
  async askAiById(@Param('questionId') questionId: string) {
    const id = Number(questionId);
    if (isNaN(id)) {
      throw new HttpException(
        '유효한 questionId가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existing = await this.aiService.findByQuestionId(id);
      if (existing) {
        return {
          success: true,
          data: { answer: existing.content, source: 'cached' },
        };
      }

      const question = await this.aiService.findQuestionById(id);
      if (!question) {
        throw new HttpException(
          '질문을 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error('AI 답변 생성 실패:', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'AI 답변 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
