import { IQuery } from '@nestjs/cqrs';

export default class VerificationSignUpQuery implements IQuery {
  constructor(public readonly shortCode: string) {}
}
