import { ICommand } from '@nestjs/cqrs';
import { VerificationPhoneRequest } from '@modules/identity/dtos';

export default class VerificationPhoneCommand implements ICommand {
  constructor(public readonly req: VerificationPhoneRequest) {}
}
