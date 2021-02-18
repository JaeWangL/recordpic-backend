import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeviceEntity } from '../../domain';
import { DevicePreviewDto } from '../../dtos';
import { DeviceService } from '../../services';
import { toDevicePreviewDTO } from '../device.extensions';
import CreateDeviceCommand from './createDevice.command';

@CommandHandler(CreateDeviceCommand)
export default class CreateDeviceHandler implements ICommandHandler<CreateDeviceCommand, DevicePreviewDto> {
  constructor(private readonly deviceSvc: DeviceService) {}

  async execute(command: CreateDeviceCommand): Promise<DevicePreviewDto> {
    const { req } = command;

    const existing = await this.deviceSvc.findByUserIdAndTypeAsync(req.userId, req.type);
    if (existing) {
      existing.updateToken(req.deviceToken);
      await this.deviceSvc.updateAsync(existing);

      return toDevicePreviewDTO(existing);
    }

    const newDevice = new DeviceEntity(req.userId, req.type, req.deviceToken);
    await this.deviceSvc.createAsync(newDevice);

    return toDevicePreviewDTO(newDevice);
  }
}
