import { IQuery } from '@nestjs/cqrs';

export default class GetMomentPreviewQuery implements IQuery {
  constructor(readonly id: number) {}
}
