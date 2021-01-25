import { ICommand } from '@nestjs/cqrs';
import { SignInSocialRequest } from '@modules/identity/dtos';

export default class SignInSocialCommand implements ICommand {
  constructor(public readonly req: SignInSocialRequest) {}
}
