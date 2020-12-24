import { ICommand } from '@nestjs/cqrs';
import { SignInRequest } from '@modules/identity/dtos';

export default class SignInCommand implements ICommand {
  constructor(public readonly req: SignInRequest) {}
}
