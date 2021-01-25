import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

export enum SignInType {
  Web = 0,
  Mobile = 1,
}

@Entity('Tokens')
export default class TokenEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'tinyint', enum: SignInType })
  type: SignInType;

  @Column({ type: 'nvarchar', length: 1024 })
  refreshToken: string;

  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(userId: number, type: number, refreshToken: string, expirationDate: Date) {
    super();
    this.userId = userId;
    this.type = type;
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
  }

  updateToken(newRefreshToken: string): void {
    this.refreshToken = newRefreshToken;
    this.updatedAt = new Date();
  }
}
