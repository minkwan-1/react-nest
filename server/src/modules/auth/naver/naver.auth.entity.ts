import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class NaverUser {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  name?: string;

  @CreateDateColumn()
  connectedAt: Date;
}

// id
// connectedAt
// profileImage
// nickname
