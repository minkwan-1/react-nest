import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('user_sessions')
export class UserSession {
  @PrimaryColumn({ name: 'session_id' })
  sessionId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  provider: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  data: any;
}
