import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiAnswer } from './ai.entity';
import { Question } from '../questions/questions.entity';
import { JSDOM } from 'jsdom';

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
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  }

  async generateAnswer(
    title: string,
    content: string,
    questionId: number,
  ): Promise<string> {
    console.log('[generateAnswer] 호출됨', { title, content, questionId });

    // HTML 제거
    const plainContent =
      new JSDOM(content).window.document.body.textContent || '';
    const prompt = this.buildPrompt(title, plainContent);

    console.log('[generateAnswer] 생성된 프롬프트:', prompt);

    try {
      let aiAnswer: string | undefined;

      // 최대 3회 재시도
      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`[generateAnswer] Gemini API 호출 시도 ${attempt}`);
        const result = await this.model.generateContent(prompt);
        console.log(
          '[generateAnswer] raw result:',
          JSON.stringify(result, null, 2),
        );

        // 안전하게 추출
        const candidate = result.response?.candidates?.[0];
        if (candidate) {
          if (candidate.content?.parts?.length) {
            aiAnswer = candidate.content.parts[0].text;
          } else if (candidate.content?.text) {
            aiAnswer = candidate.content.text;
          }
        }

        console.log('[generateAnswer] 추출된 AI 답변:', aiAnswer);

        if (aiAnswer && aiAnswer.trim() !== '') break;

        console.warn('[generateAnswer] AI 응답이 비어 있음, 재시도...');
      }

      if (!aiAnswer || aiAnswer.trim() === '') {
        throw new Error('AI로부터 답변을 받지 못했습니다.');
      }

      // DB 저장
      const savedAnswer = this.aiAnswerRepository.create({
        questionId,
        title,
        content: aiAnswer.trim(),
      });
      await this.aiAnswerRepository.save(savedAnswer);

      console.log('[generateAnswer] 최종 AI 답변 저장 완료');
      return aiAnswer.trim();
    } catch (error: any) {
      console.error('[generateAnswer] Gemini API 호출 실패', error);

      if (error.message?.includes('API_KEY')) {
        throw new HttpException(
          'API 키 설정에 문제가 있습니다.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (error.message?.includes('quota')) {
        throw new HttpException(
          'API 할당량을 초과했습니다.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      throw new HttpException(
        'AI 서비스 연결에 실패했습니다.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findByQuestionId(questionId: number): Promise<AiAnswer | null> {
    return this.aiAnswerRepository.findOne({
      where: { questionId },
    });
  }

  async findQuestionById(questionId: number): Promise<Question | null> {
    return this.questionRepository.findOne({
      where: { id: questionId },
    });
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

답변:`;
  }
}
