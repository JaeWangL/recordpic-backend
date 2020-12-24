import { Global, HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import IdentityModule from '@modules/identity/identity.module';
import LoggerService from './logger/logger.service';
import ScheduleService from './schedule/schedule.service';

const providers = [LoggerService, ScheduleService];

@Global()
@Module({
  providers,
  imports: [HttpModule, ScheduleModule.forRoot(), IdentityModule],
  exports: [HttpModule, ...providers],
})
export default class SharedModule {}
