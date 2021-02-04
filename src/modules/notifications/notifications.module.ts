import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCommandHandlers } from './commands';
import { NotificationsController } from './controllers';
import { NotificationEntity } from './domain';
import { NotificationService } from './services';

const AllEntities = [NotificationEntity];
const AllServices = [NotificationService];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities])],
  controllers: [NotificationsController],
  providers: [...AllCommandHandlers],
  exports: [...AllServices],
})
export default class NotificationsModule {}
