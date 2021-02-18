import { ICommand } from '@nestjs/cqrs';
import { DeleteDeviceRequest } from '../../dtos';

export default class DeleteDeviceCommand implements ICommand {
  constructor(public readonly req: DeleteDeviceRequest) {}
}
