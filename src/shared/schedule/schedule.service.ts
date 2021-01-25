import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenService } from '@modules/identity/services';

@Injectable()
export default class ScheduleService {
  constructor(private readonly tokenSvc: TokenService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron(): Promise<void> {
    Logger.log('Expired refresh token is automatically deleted');

    this.tokenSvc.deleteByExpirationAsync();
  }
}
