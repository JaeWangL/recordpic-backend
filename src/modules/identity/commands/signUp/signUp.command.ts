import { ICommand } from '@nestjs/cqrs';
import { SignUpRequest } from '@modules/identity/dtos';

export default class SignUpCommand implements ICommand {
  constructor(public readonly req: SignUpRequest) {}
}
