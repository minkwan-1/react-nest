import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.questions, { nullable: true })
  user: User;
}
