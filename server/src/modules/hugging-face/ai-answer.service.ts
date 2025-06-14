import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiAnswerService {
  private readonly HUGGINGFACE_API_URL =
    'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
  private readonly HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_API_KEY; // 환경변수에서 가져오기

  constructor(private readonly httpService: HttpService) {}

  async generateAnswer(
    questionTitle: string,
    questionContent: string,
  ): Promise<string> {
    try {
      // HTML 태그 제거하고 텍스트만 추출
      const cleanContent = this.stripHtml(questionContent);

      // 프롬프트 구성
      const prompt = `질문: ${questionTitle}\n내용: ${cleanContent}\n\n위 질문에 대한 도움이 되는 답변을 한국어로 작성해주세요. 구체적이고 실용적인 해결책을 제시해주세요.`;

      const response = await firstValueFrom(
        this.httpService.post(
          this.HUGGINGFACE_API_URL,
          {
            inputs: prompt,
            parameters: {
              max_length: 500,
              temperature: 0.7,
              do_sample: true,
              top_p: 0.9,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.HUGGINGFACE_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      if (
        response.data &&
        response.data[0] &&
        response.data[0].generated_text
      ) {
        // 원본 프롬프트 제거하고 답변 부분만 추출
        let answer = response.data[0].generated_text.replace(prompt, '').trim();

        // 답변이 너무 짧으면 기본 답변 제공
        if (answer.length < 50) {
          answer = this.getDefaultAnswer(questionTitle);
        }

        return answer;
      }

      // API 응답이 예상과 다를 경우 기본 답변 반환
      return this.getDefaultAnswer(questionTitle);
    } catch (error) {
      console.error('AI 답변 생성 중 오류:', error);

      // 에러 시 기본 답변 반환
      return this.getDefaultAnswer(questionTitle);
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }

  private getDefaultAnswer(questionTitle: string): string {
    return `"${questionTitle}"에 대한 질문을 확인했습니다. 

이 문제를 해결하기 위한 몇 가지 접근 방법을 제안드립니다:

1. **문제 분석**: 먼저 문제의 근본 원인을 파악해보세요.
2. **단계별 접근**: 큰 문제를 작은 단위로 나누어 해결해보세요.
3. **참고 자료 활용**: 관련 문서나 레퍼런스를 참고하시면 도움이 될 것입니다.
4. **커뮤니티 활용**: 비슷한 문제를 겪은 다른 개발자들의 경험을 찾아보세요.

더 구체적인 도움이 필요하시면 추가 정보를 제공해주시면 더 상세한 답변을 드릴 수 있습니다.`;
  }
}
