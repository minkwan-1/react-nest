// src/ai/ai.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiAnswer } from './ai.entity';
import { Question } from '../questions/questions.entity';
import { JSDOM } from 'jsdom';
import { Observable } from 'rxjs'; // Observable 임포트

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(
    @InjectRepository(AiAnswer)
    private readonly aiAnswerRepository: Repository<AiAnswer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // 요청하신 대로 모델은 변경하지 않습니다.
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * [신규] 스트리밍 방식으로 AI 답변을 생성하고 반환하는 메서드
   */
  generateAnswerStream(
    title: string,
    content: string,
    questionId: number,
  ): Observable<string> {
    const plainContent =
      new JSDOM(content).window.document.body.textContent || '';
    const prompt = this.buildPrompt(title, plainContent);

    return new Observable((subscriber) => {
      const runStream = async () => {
        try {
          const result = await this.model.generateContentStream(prompt);

          let fullAnswer = '';
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullAnswer += chunkText;
            subscriber.next(chunkText);
          }

          if (fullAnswer.trim()) {
            await this.saveAnswer(questionId, title, fullAnswer.trim());
          }

          subscriber.complete();
        } catch (error: any) {
          console.error('[generateAnswerStream] Gemini API 호출 실패', error);
          subscriber.error(this.handleApiError(error));
        }
      };

      runStream();
    });
  }

  /**
   * [기존] 전체 텍스트를 한 번에 생성하는 메서드
   */
  async generateAnswer(
    title: string,
    content: string,
    questionId: number,
  ): Promise<string> {
    console.log('[generateAnswer] 호출됨', { title, content, questionId });

    const plainContent =
      new JSDOM(content).window.document.body.textContent || '';
    const prompt = this.buildPrompt(title, plainContent);

    try {
      let aiAnswer: string | undefined;

      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`[generateAnswer] Gemini API 호출 시도 ${attempt}`);
        const result = await this.model.generateContent(prompt);
        const response = result.response;
        // 최신 SDK에서는 response.text() 메서드를 사용합니다.
        aiAnswer = response.text();

        if (aiAnswer && aiAnswer.trim() !== '') break;
        console.warn('[generateAnswer] AI 응답이 비어 있음, 재시도...');
      }

      if (!aiAnswer || aiAnswer.trim() === '') {
        throw new Error('AI로부터 답변을 받지 못했습니다.');
      }

      await this.saveAnswer(questionId, title, aiAnswer.trim());
      return aiAnswer.trim();
    } catch (error: any) {
      console.error('[generateAnswer] Gemini API 호출 실패', error);
      throw this.handleApiError(error);
    }
  }

  // DB 저장 로직 (공통)
  private async saveAnswer(
    questionId: number,
    title: string,
    content: string,
  ): Promise<void> {
    // 기존 답변이 있으면 업데이트, 없으면 새로 생성
    let answer = await this.findByQuestionId(questionId);
    if (answer) {
      answer.content = content;
    } else {
      answer = this.aiAnswerRepository.create({ questionId, title, content });
    }
    await this.aiAnswerRepository.save(answer);
    console.log('[saveAnswer] AI 답변 저장/업데이트 완료');
  }

  // API 에러 처리 (공통)
  private handleApiError(error: any): HttpException {
    if (error.message?.includes('API_KEY')) {
      return new HttpException(
        'API 키 설정에 문제가 있습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (error.message?.includes('quota')) {
      return new HttpException(
        'API 할당량을 초과했습니다.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return new HttpException(
      'AI 서비스 연결에 실패했습니다.',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  // --- 기존 유틸리티 메서드 ---
  async findByQuestionId(questionId: number): Promise<AiAnswer | null> {
    return this.aiAnswerRepository.findOne({ where: { questionId } });
  }

  async findQuestionById(questionId: number): Promise<Question | null> {
    return this.questionRepository.findOne({ where: { id: questionId } });
  }

  private buildPrompt(title: string, content: string): string {
    return `
당신은 개발자들을 위한 전문적인 Q&A 어시스턴트입니다. 
다음 질문에 대해 정확하고 도움이 되는 답변을 제공해주세요.

질문 제목: ${title}

질문 내용:
${content}

답변 시 다음 사항을 고려해주세요:
1. 기술적인 질문의 경우 구체적인 예시 코드나 단계별 설명을 포함해주세요
2. 최신 기술 동향과 베스트 프랙티스를 반영해주세요
3. 가능한 한 실용적이고 실행 가능한 솔루션을 제시해주세요
4. 답변은 한국어로 작성해주세요
5. 마크다운 형식을 사용해서 읽기 쉽게 구조화해주세요
6. 글자 수는 1000자 이내로 제한해주세요

답변:`;
  }
}
