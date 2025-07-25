import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

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

  @Column({ default: false })
  isExist: boolean;

  @OneToOne(() => User, (user) => user.googleAccount)
  user?: User;
}
