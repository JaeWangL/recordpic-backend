import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PhotoPreviewDto } from '../../dtos';
import { PhotoService } from '../../services';
import GetPhotosPreviewQuery from './getPhotos-preview.query';
import { toPhotosPreviewDTO } from '../photo.extensions';

@QueryHandler(GetPhotosPreviewQuery)
export default class GetPhotosPreviewHandler implements IQueryHandler<GetPhotosPreviewQuery, PhotoPreviewDto[]> {
  constructor(private readonly photoSvc: PhotoService) {}

  async execute(query: GetPhotosPreviewQuery): Promise<PhotoPreviewDto[]> {
    const { momentId } = query;

    const photos = await this.photoSvc.findByMomentIdAsync(momentId);

    return toPhotosPreviewDTO(photos);
  }
}
