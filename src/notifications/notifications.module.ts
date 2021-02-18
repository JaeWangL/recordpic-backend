import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCommandHandlers, AllQueryHandlers } from './commands';
import { DevicesController, NotificationsController } from './controllers';
import { DeviceEntity, NotificationEntity } from './domain';
import { DeviceService, NotificationService } from './services';

const AllControllers = [DevicesController, NotificationsController];
const AllEntities = [DeviceEntity, NotificationEntity];
const AllServices = [DeviceService, NotificationService];

@Global()
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities])],
  controllers: [...AllControllers],
  providers: [...AllServices, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllServices],
})
export default class NotificationsModule {}
