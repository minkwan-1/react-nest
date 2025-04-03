import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('google_user')
export class GoogleUser {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'verified_email', default: false })
  verifiedEmail: boolean;

  @Column()
  name: string;

  @Column({ name: 'given_name' })
  givenName: string;

  @Column({ name: 'family_name' })
  familyName: string;

  @Column({ name: 'profile_image', nullable: true })
  profileImage?: string;

  @Column({ name: 'is_default_image', default: false })
  isDefaultImage: boolean;

  @Column({ name: 'connected_at', type: 'timestamptz', nullable: true })
  connectedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
