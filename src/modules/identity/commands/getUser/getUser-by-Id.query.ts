import { IQuery } from '@nestjs/cqrs';

export default class GetUserByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
