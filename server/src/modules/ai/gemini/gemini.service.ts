import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class GeminiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      throw new Error('Gemini API Key is required');
    }
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;
  }

  async generateAnswer(title: string, content: string): Promise<string> {
    try {
      const prompt = `다음 질문에 대해 상세하고 도움이 되는 답변을 제공해주세요:

제목: ${title}
내용: ${content}

답변은 다음 조건을 만족해야 합니다:
1. 기술적으로 정확하고 실용적인 정보를 포함
2. 코드 예제가 필요한 경우 명확한 예시 제공
3. 단계별 설명이 필요한 경우 순서대로 설명
4. 한국어로 친근하고 이해하기 쉽게 작성
5. 관련 베스트 프랙티스나 주의사항이 있다면 포함

답변:`;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error(
          `Gemini API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content
      ) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('No response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(
        `Failed to generate content from Gemini: ${error.message}`,
      );
    }
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error(
          `Gemini API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content
      ) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('No response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(
        `Failed to generate content from Gemini: ${error.message}`,
      );
    }
  }
}
