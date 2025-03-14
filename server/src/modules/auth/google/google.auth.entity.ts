import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('google_user')
export class GoogleUser {
  @PrimaryColumn({ type: 'numeric' })
  id: number;

  @Column({ type: 'timestamptz' })
  connectedAt: Date;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ default: false })
  isDefaultImage: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
