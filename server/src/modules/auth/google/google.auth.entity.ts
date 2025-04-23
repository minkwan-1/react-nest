import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('google_user')
export class GoogleUser {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column({ name: 'verified_email' })
  verifiedEmail: boolean;

  @Column()
  name: string;

  @Column({ name: 'given_name' })
  givenName: string;

  @Column({ name: 'family_name' })
  familyName: string;

  @Column({ name: 'profile_image' })
  profileImage: string;

  @Column({ name: 'is_default_image' })
  isDefaultImage: boolean;

  @Column({ name: 'connected_at' })
  connectedAt: Date;

  @Column({ name: 'registration_complete', default: false })
  registrationComplete: boolean;

  @Column({ name: 'token_expires_at', nullable: true })
  tokenExpiresAt: Date;
}
