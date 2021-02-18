import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { NotificationEntity } from '../../domain';
import { NotificationPreviewDto } from '../../dtos';
import { NotificationService } from '../../services';
import { toNotificationPreviewDTO } from '../notification.extensions';
import CreateNotificationCommand from './createNotification.command';

@CommandHandler(CreateNotificationCommand)
export default class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand, NotificationPreviewDto> {
  constructor(private readonly notifyingSvc: NotificationService) {}

  async execute(command: CreateNotificationCommand): Promise<NotificationPreviewDto> {
    const { req } = command;

    const newNotification = new NotificationEntity(
      req.userId,
      req.type,
      req.memberName,
      req.memberImageUrl,
      req.albumId,
      req.momentId,
    );
    await this.notifyingSvc.createAsync(newNotification);

    return toNotificationPreviewDTO(newNotification);
  }
}
