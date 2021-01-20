import { Global, HttpModule, Module } from '@nestjs/common';
import IdentityModule from '@modules/identity/identity.module';
import BlobService from './azure/blob.service';
import LoggerService from './logger/logger.service';
import NaverService from './naver/naver.service';
import ScheduleService from './schedule/schedule.service';
import SendGridService from './sendgrid/sendgrid.service';

const services = [BlobService, LoggerService, NaverService, ScheduleService, SendGridService];

@Global()
@Module({
  imports: [HttpModule, IdentityModule],
  providers: services,
  exports: services,
})
export default class SharedModule {}
