import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Path from 'path';
import BlobService from '@shared/azure/blob.service';
import { PhotoService } from '../../services';
import DeletePhotoCommand from './deletePhoto.command';

@CommandHandler(DeletePhotoCommand)
export default class DeleteMomentHandler implements ICommandHandler<DeletePhotoCommand, boolean> {
  constructor(private readonly blobSvc: BlobService, private readonly photoSvc: PhotoService) {}

  async execute(command: DeletePhotoCommand): Promise<boolean> {
    Logger.log('Delet Photo...', 'DeletPhotoCommand');
    const { req } = command;

    const photo = await this.photoSvc.findByIdAsync(req.id);
    if (!photo) {
      throw new NotFoundException('The photo does not exist');
    }

    await this.blobSvc.deleteBlobAsync(process.env.PHOTO_CONTAINER || 'images', Path.basename(photo.photoUrl));

    await this.photoSvc.removeAsync(photo);

    return true;
  }
}
