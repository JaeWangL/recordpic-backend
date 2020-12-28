import { ICommand } from '@nestjs/cqrs';
import { SignOutRequest } from '@modules/identity/dtos';

export default class SignOutCommand implements ICommand {
  constructor(public readonly req: SignOutRequest) {}
}
