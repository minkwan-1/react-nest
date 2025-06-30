// ai.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // 환경변수에서 API 키를 가져옵니다
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async generateAnswer(title: string, content: string): Promise<string> {
    try {
      // 프롬프트 구성
      const prompt = this.buildPrompt(title, content);

      // Gemini API 호출
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const aiAnswer = response.text();

      if (!aiAnswer || aiAnswer.trim() === '') {
        throw new Error('AI로부터 답변을 받지 못했습니다.');
      }

      return aiAnswer.trim();
    } catch (error) {
      console.error('Gemini API 호출 실패:', error);

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
