import { Column, Entity, Index } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

export enum SocialSignInType {
  Google = 0,
  Naver = 1,
}

@Entity('Users')
export default class UserEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 256 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  passwordHash: string;

  @Column({ type: 'bit' })
  emailConfirmed: boolean;

  @Column({ type: 'nvarchar', length: 30 })
  name: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  imageUrl?: string;

  @Column({ type: 'tinyint', nullable: true })
  socialType?: SocialSignInType;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  socialId?: string;

  constructor(
    email: string,
    passwordHash: string,
    name: string,
    imageUrl?: string,
    socialType?: number,
    socialId?: string,
  ) {
    super();
    this.email = email;
    this.passwordHash = passwordHash;
    this.emailConfirmed = false;
    this.name = name;
    this.imageUrl = imageUrl;
    this.socialType = socialType;
    this.socialId = socialId;
  }
}
