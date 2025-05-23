import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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

  // @Column()
  // askedBy: string;

  // @Column()
  // createdAt: Date;

  // @Column()
  // updatedAt: Date;

  // @Column()
  // upVoteCount: number;

  // @Column()
  // downVoteCount: number;

  // @Column()
  // answerCount: number;

  // @Column()
  // viewCount: number;

  @ManyToOne(() => User, (user) => user.questions, { nullable: true })
  user: User;
}
