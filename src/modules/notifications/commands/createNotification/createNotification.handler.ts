import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { NotificationEntity } from '../../domain';
import { NotificationDto } from '../../dtos';
import { NotificationService } from '../../services';
import { toNotificationDTO } from '../notification.extensions';
import CreateNotificationCommand from './createNotification.command';

@CommandHandler(CreateNotificationCommand)
export default class CreateNotificationHandler implements ICommandHandler<CreateNotificationCommand, NotificationDto> {
  constructor(private readonly notifyingSvc: NotificationService) {}

  async execute(command: CreateNotificationCommand): Promise<NotificationDto> {
    const { req } = command;

    const newNotification = new NotificationEntity(req.userId, req.type, req.userName);
    await this.notifyingSvc.createAsync(newNotification);

    return toNotificationDTO(newNotification);
  }
}
