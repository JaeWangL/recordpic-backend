import { ICommand } from '@nestjs/cqrs';

export default class VerificationSignUpCommand implements ICommand {
  constructor(public readonly shortCode: string) {}
}
