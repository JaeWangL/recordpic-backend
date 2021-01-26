import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { VerificationPhoneEntity } from '../domain';

@Injectable()
export default class VerificationPhoneService {
  constructor(
    @InjectRepository(VerificationPhoneEntity)
    private verifyingSvc: Repository<VerificationPhoneEntity>,
  ) {}

  async createAsync(newCode: VerificationPhoneEntity): Promise<VerificationPhoneEntity> {
    return await this.verifyingSvc.save(newCode);
  }

  async deleteByExpirationAsync(): Promise<void> {
    await this.verifyingSvc.delete({ expirationDate: LessThanOrEqual(new Date()) });
  }

  async deleteByNumberAsync(number: string): Promise<void> {
    await this.verifyingSvc.delete({ number });
  }

  async findByNumberAndCodeAsync(
    countryCode: string,
    number: string,
    code: string,
  ): Promise<VerificationPhoneEntity | undefined> {
    const verifying = await this.verifyingSvc.findOne({
      where: {
        countryCode,
        number,
        code,
      },
    });

    return verifying;
  }

  async updateAsync(updatedCode: VerificationPhoneEntity): Promise<VerificationPhoneEntity> {
    return await this.verifyingSvc.save(updatedCode);
  }
}
