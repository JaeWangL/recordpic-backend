import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { TokenEntity } from '../domain';

@Injectable()
export default class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenSvc: Repository<TokenEntity>,
  ) {}

  async createAsync(newToken: TokenEntity): Promise<TokenEntity> {
    return await this.tokenSvc.save(newToken);
  }

  async deleteByExpirationAsync(): Promise<void> {
    await this.tokenSvc.delete({ expirationDate: LessThanOrEqual(new Date()) });
  }

  async deleteByUserIdAsync(userId: number): Promise<void> {
    await this.tokenSvc.delete({ userId });
  }

  async findByUserIdAndTokenAsync(
    userId: number,
    type: number,
    refreshToken: string,
  ): Promise<TokenEntity | undefined> {
    const token = await this.tokenSvc.findOne({
      where: {
        userId,
        type,
        refreshToken,
      },
    });

    return token;
  }

  async updateAsync(updatedToken: TokenEntity): Promise<TokenEntity> {
    return await this.tokenSvc.save(updatedToken);
  }
}
