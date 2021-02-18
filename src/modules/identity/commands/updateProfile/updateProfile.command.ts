import { ICommand } from '@nestjs/cqrs';
import { UpdateProfileRequest } from '@modules/identity/dtos';

export default class UpdateProfileCommand implements ICommand {
  constructor(public readonly req: UpdateProfileRequest) {}
}
