import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeviceService } from '../../services';
import DeleteDeviceCommand from './deleteDevice.command';

@CommandHandler(DeleteDeviceCommand)
export default class DeleteDeviceHandler implements ICommandHandler<DeleteDeviceCommand, boolean> {
  constructor(private readonly deviceSvc: DeviceService) {}

  async execute(command: DeleteDeviceCommand): Promise<boolean> {
    const { req } = command;

    await this.deviceSvc.deleteByUserIdAndTypeAsync(req.userId, req.type);

    return true;
  }
}
