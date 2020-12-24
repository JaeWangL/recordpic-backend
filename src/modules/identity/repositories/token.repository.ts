import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { TokenEntity } from '../domain';

@Injectable()
export default class TokenRepository {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepo: Repository<TokenEntity>,
  ) {}

  async createAsync(newToken: TokenEntity): Promise<TokenEntity> {
    const token = await this.tokenRepo.save(newToken);

    return token;
  }

  async deleteByExpiration(): Promise<void> {
    await this.tokenRepo.delete({ expirationDate: LessThanOrEqual(new Date()) });
  }

  async findByUserId(userId: number): Promise<TokenEntity | undefined> {
    const token = await this.tokenRepo.findOne({
      where: {
        userId,
      },
    });

    return token;
  }

  async updateAsync(updatedToken: TokenEntity): Promise<TokenEntity> {
    const token = await this.tokenRepo.save(updatedToken);

    return token;
  }
}
