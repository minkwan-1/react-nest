import {
  IsString,
  IsArray,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class QuestionDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  tags: string[];

  @IsInt()
  answerCount: number;

  @IsInt()
  upVoteCount: number;

  @IsInt()
  downVoteCount: number;

  @IsInt()
  viewCount: number;

  @IsString()
  askedBy: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
