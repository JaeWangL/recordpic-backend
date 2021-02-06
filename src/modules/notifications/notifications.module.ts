import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCommandHandlers, AllQueryHandlers } from './commands';
import { NotificationsController } from './controllers';
import { NotificationEntity } from './domain';
import { NotificationService } from './services';

const AllControllers = [NotificationsController];
const AllEntities = [NotificationEntity];
const AllServices = [NotificationService];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities])],
  controllers: [...AllControllers],
  providers: [...AllServices, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllServices],
})
export default class NotificationsModule {}
