import { Column, Entity, Index } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
import { SocialSignInType } from '@common/enum-types';
import { parseUSocialType } from '@infrastructure/utils';

@Entity('Users')
export default class UserEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 256, unique: true })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  passwordHash?: string;

  @Column({ type: 'bit' })
  emailConfirmed: boolean;

  @Column({ type: 'nvarchar', length: 30 })
  name: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  imageUrl?: string;

  @Column({ type: 'tinyint', nullable: true })
  socialType?: number;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  socialId?: string;

  constructor(
    email: string,
    name: string,
    emailConfirmed = false,
    passwordHash?: string,
    imageUrl?: string,
    socialType?: SocialSignInType,
    socialId?: string,
  ) {
    super();
    this.email = email;
    this.emailConfirmed = emailConfirmed;
    this.name = name;
    this.passwordHash = passwordHash;
    this.imageUrl = imageUrl;
    this.socialType = parseUSocialType(socialType);
    this.socialId = socialId;
  }

  updateEmailConfirmed(confirmed = true): void {
    this.emailConfirmed = confirmed;
    this.updatedAt = new Date();
  }

  updateProfile(name: string, imageUrl?: string): void {
    this.name = name;
    this.imageUrl = imageUrl;
    this.updatedAt = new Date();
  }
}
