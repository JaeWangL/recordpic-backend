import { IQuery } from '@nestjs/cqrs';

export default class GetPhotosPreviewQuery implements IQuery {
  constructor(readonly momentId: number) {}
}
