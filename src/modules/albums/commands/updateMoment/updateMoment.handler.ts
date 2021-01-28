import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MomentEntity, PhotoEntity } from '../../domain';
import { MomentPreviewDto, UpdateMomentRequest, UpdatePhotoWithMomentRequest } from '../../dtos';
import { MomentService, PhotoService } from '../../services';
import { toMomentPreviewWithUpdateDTO } from '../moment.extensions';
import UpdateMomentCommand from './updateMoment.command';

@CommandHandler(UpdateMomentCommand)
export default class UpdateMomentHandler implements ICommandHandler<UpdateMomentCommand, MomentPreviewDto> {
  constructor(private readonly momentSvc: MomentService, private readonly photoSvc: PhotoService) {}

  async execute(command: UpdateMomentCommand): Promise<MomentPreviewDto> {
    Logger.log('Update Moment...', 'UpdateMomentCommand');
    const { req } = command;

    const updatedMoment = await this.updateMomentAsync(req);
    this.checkPhotos(updatedMoment.albumId, updatedMoment.id, req);

    return toMomentPreviewWithUpdateDTO(updatedMoment, req.photos[0].photoUrl, req.photos.length);
  }

  private async updateMomentAsync(req: UpdateMomentRequest): Promise<MomentEntity> {
    const moment = await this.momentSvc.findByIdAsync(req.id);
    if (!moment) {
      throw new NotFoundException('moment does not exist');
    }

    moment.updateSettings(req.name, req.momentDate);
    await this.momentSvc.updateAsync(moment);

    return moment;
  }

  private checkPhotos(albumId: number, momentId: number, req: UpdateMomentRequest): void {
    req.photos.forEach(async (photo) => {
      if (photo.id) {
        await this.updatePhotoAsync(photo.id, photo);
      } else {
        await this.createPhotoAsync(albumId, momentId, photo);
      }
    });
  }

  private async createPhotoAsync(albumId: number, momentId: number, photo: UpdatePhotoWithMomentRequest) {
    const newPhoto = new PhotoEntity(albumId, momentId, photo.photoUrl, photo.title, photo.description);

    await this.photoSvc.createAsync(newPhoto);
  }

  private async updatePhotoAsync(photoId: number, photo: UpdatePhotoWithMomentRequest) {
    const existing = await this.photoSvc.findByIdAsync(photoId);
    if (!existing) {
      return;
    }

    existing.updatePhoto(photo.photoUrl, photo.title, photo.description);
  }
}
