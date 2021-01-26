import { IQuery } from '@nestjs/cqrs';

export default class VerificationSignUpCommand implements IQuery {
  constructor(public readonly shortCode: string) {}
}
