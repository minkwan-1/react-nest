import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  // OneToOne,
  // JoinColumn,
  // Unique,
} from 'typeorm';
import { Question } from 'src/modules/questions/questions.entity';
// import { GoogleUser } from 'src/modules/auth/google/google.auth.entity';

@Entity('users')
// @Unique(['googleAccount'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  // @OneToOne(() => GoogleUser)
  // @JoinColumn({ name: 'accountID', referencedColumnName: 'id' })
  // googleAccount: GoogleUser;

  @Column({ nullable: true })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @Column()
  accountID: string;
}
