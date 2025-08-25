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

// SSE가 클라이언트에 보내는 데이터 형식
interface MessageEvent {
  data: string | object;
}

@Controller('api')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * ID 기반 질문에 대해 AI 답변을 스트리밍하는 SSE 엔드포인트
   * 캐시를 확인하지 않고 항상 새로운 답변을 생성하여 스트리밍합니다.
   */
  // src/ai/ai.controller.ts

  @Sse('ask-ai/stream/:questionId')
  async streamAskAiById(
    @Param('questionId') questionId: string,
  ): Promise<Observable<MessageEvent>> {
    console.log('AI 스트리밍 요청 수신됨 (id 기반)');

    const id = Number(questionId);
    if (isNaN(id)) {
      throw new HttpException(
        '유효한 questionId가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 1️⃣ DB 캐시 확인
    const existing = await this.aiService.findByQuestionId(id);

    console.log('이미 존재하는 AI 답변 로깅: ', existing);
    if (existing) {
      console.log('캐시된 답변 존재, DB에서 가져옵니다.');
      return new Observable<MessageEvent>((subscriber) => {
        subscriber.next({ data: existing.content });
        subscriber.complete();
      });
    }

    // 2️⃣ 질문 조회 (없으면 에러)
    const question = await this.aiService.findQuestionById(id);
    if (!question) {
      throw new HttpException('질문을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }

    // 3️⃣ 스트리밍 시작
    const obs$ = this.aiService
      .generateAnswerStream(question.title, question.content, id)
      .pipe(
        map((chunk: string) => ({ data: chunk })),
        tap((chunk) => console.log('SSE로 전송될 chunk:', chunk)),
      );

    console.log('Observable 생성 완료:', obs$);
    return obs$;
  }

  /**
   * Title/Content 기반 질문에 대해 전체 답변을 반환하는 엔드포인트
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

  /**
   * ID 기반 질문에 대해 전체 답변을 반환하는 엔드포인트
   */
  @Get('ask-ai/:questionId')
  async askAiById(@Param('questionId') questionId: string) {
    console.log('AI 요청 수신됨 (id 기반)');

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

      const aiAnswer = await this.aiService.generateAnswer(
        question.title,
        question.content,
        id,
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
}
