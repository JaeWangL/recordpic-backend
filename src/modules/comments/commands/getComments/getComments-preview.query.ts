import { IQuery } from '@nestjs/cqrs';

export default class GetCommentsPreviewQuery implements IQuery {
  constructor(readonly momentId: number, readonly pageIndex: number, readonly pageSize: number) {}
}
