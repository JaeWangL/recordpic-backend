import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenRepository } from '@modules/identity/repositories';

@Injectable()
export default class ScheduleService {
  constructor(private readonly tokenRepo: TokenRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron(): Promise<void> {
    Logger.log('Expired refresh token is automatically deleted');

    this.tokenRepo.deleteByExpirationAsync();
  }
}
