import { ICommand } from '@nestjs/cqrs';
import { SignUpSocialRequest } from '@modules/identity/dtos';

export default class SignUpSocialCommand implements ICommand {
  constructor(public readonly req: SignUpSocialRequest) {}
}
