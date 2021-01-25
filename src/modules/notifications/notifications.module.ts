import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AllCommandHandlers } from './commands';
import { NotificationsController } from './controllers';

@Module({
  imports: [CqrsModule],
  controllers: [NotificationsController],
  providers: [...AllCommandHandlers],
})
export default class NotificationsModule {}
