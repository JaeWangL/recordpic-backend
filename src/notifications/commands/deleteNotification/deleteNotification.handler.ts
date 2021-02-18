import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { NotificationService } from '../../services';
import DeleteNotificationCommand from './deleteNotification.command';

@CommandHandler(DeleteNotificationCommand)
export default class DeleteNotificationHandler implements ICommandHandler<DeleteNotificationCommand, boolean> {
  constructor(private readonly notifyingSvc: NotificationService) {}

  async execute(command: DeleteNotificationCommand): Promise<boolean> {
    const { req } = command;

    await this.notifyingSvc.deleteByUserIdAsync(req.id);

    return true;
  }
}
