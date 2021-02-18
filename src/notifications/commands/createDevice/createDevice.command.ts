import { ICommand } from '@nestjs/cqrs';
import { CreateDeviceRequest } from '../../dtos';

export default class CreateDeviceCommand implements ICommand {
  constructor(public readonly req: CreateDeviceRequest) {}
}
