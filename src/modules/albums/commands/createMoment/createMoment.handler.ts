import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MomentEntity, PhotoEntity } from '../../domain';
import { CreateMomentRequest, MomentPreviewDto } from '../../dtos';
import { MomentService, PhotoService } from '../../services';
import { toMomentPreviewWithPhotoDTO } from '../moment.extensions';
import CreateMomentCommand from './createMoment.command';

@CommandHandler(CreateMomentCommand)
export default class CreateMomentHandler implements ICommandHandler<CreateMomentCommand, MomentPreviewDto> {
  constructor(private readonly momentSvc: MomentService, private readonly photoSvc: PhotoService) {}

  async execute(command: CreateMomentCommand): Promise<MomentPreviewDto> {
    Logger.log('Create Moment...', 'CreateMomentCommand');
    const { req } = command;

    const newMoment = await this.createNewMomentAsync(req);
    const newPhotos = await this.createPhotos(req, newMoment.id);

    return toMomentPreviewWithPhotoDTO(newMoment, newPhotos[0], newPhotos.length);
  }

  private async createNewMomentAsync(req: CreateMomentRequest): Promise<MomentEntity> {
    const newMoment = new MomentEntity(req.albumId, req.name, req.momentDate);

    return await this.momentSvc.createAsync(newMoment);
  }

  private async createPhotos(req: CreateMomentRequest, momentId: number): Promise<PhotoEntity[]> {
    const newPhotos = req.photos.map((p) => new PhotoEntity(req.albumId, momentId, p.photoUrl, p.title, p.description));

    return await this.photoSvc.createMultipleAsync(newPhotos);
  }
}
