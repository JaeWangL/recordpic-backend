import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { VerificationMailEntity } from '../domain';

@Injectable()
export default class VerificationMailService {
  constructor(
    @InjectRepository(VerificationMailEntity)
    private verifyingSvc: Repository<VerificationMailEntity>,
  ) {}

  async createAsync(newCode: VerificationMailEntity): Promise<VerificationMailEntity> {
    return await this.verifyingSvc.save(newCode);
  }

  async deleteByExpirationAsync(): Promise<void> {
    await this.verifyingSvc.delete({ expirationDate: LessThanOrEqual(new Date()) });
  }

  async deleteByUserIdAsync(userId: number): Promise<void> {
    await this.verifyingSvc.delete({ userId });
  }

  async findByCodeAsync(code: string): Promise<VerificationMailEntity | undefined> {
    const verifying = await this.verifyingSvc.findOne({
      where: {
        code,
      },
    });

    return verifying;
  }

  async findByUserIdAndCodeAsync(userId: number, code: string): Promise<VerificationMailEntity | undefined> {
    const verifying = await this.verifyingSvc.findOne({
      where: {
        userId,
        code,
      },
    });

    return verifying;
  }

  async updateAsync(updatedCode: VerificationMailEntity): Promise<VerificationMailEntity> {
    return await this.verifyingSvc.save(updatedCode);
  }
}
