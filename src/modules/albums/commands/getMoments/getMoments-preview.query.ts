import { IQuery } from '@nestjs/cqrs';

export default class GetMomentsPreviewQuery implements IQuery {
  constructor(readonly albumId: number, readonly pageIndex: number, readonly pageSize: number) {}
}
