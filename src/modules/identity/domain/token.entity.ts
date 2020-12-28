import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

@Entity('Tokens')
export default class TokenEntity extends AbstractEntity {
  @ApiProperty({ type: Number })
  @Column({ type: 'bigint' })
  userId: number;

  /**
   * NOTE
   * 0: Web
   * 1: Mobile
   */
  @ApiProperty({ type: Number })
  @Column({ type: 'tinyint' })
  type: number;

  @ApiProperty({ type: String, maxLength: 1024 })
  @Column({ type: 'nvarchar', length: 1024 })
  refreshToken: string;

  @ApiProperty({ type: Date })
  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(userId: number, type: number, refreshToken: string, expirationDate: Date) {
    super();
    this.userId = userId;
    this.type = type;
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
  }

  updateToken(newRefreshToken: string) {
    this.refreshToken = newRefreshToken;
    this.updatedAt = new Date();
  }
}
