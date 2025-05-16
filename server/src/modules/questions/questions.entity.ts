import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  userId: string;

  @Column()
  askedBy: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  upVoteCount: number;

  @Column()
  downVoteCount: number;

  @Column()
  answerCount: number;

  @Column()
  viewCount: number;

  // @Column('simple-array', { nullable: true })
  // images: string[]; // 이미지 URL 배열 추가
}
