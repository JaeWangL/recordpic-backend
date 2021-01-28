import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AlbumPreviewDto } from '../../dtos';
import { AlbumService } from '../../services';
import { toAlbumPreviewDTO } from '../album.extensions';
import UpdateAlbumCommand from './updateAlbum.command';

@CommandHandler(UpdateAlbumCommand)
export default class UpdateAlbumHandler implements ICommandHandler<UpdateAlbumCommand, AlbumPreviewDto> {
  constructor(private readonly albumSvc: AlbumService) {}

  async execute(command: UpdateAlbumCommand): Promise<AlbumPreviewDto> {
    Logger.log('Update Album...', 'UpdateAlbumCommand');
    const { req } = command;

    const album = await this.albumSvc.findByIdAsync(req.id);
    if (!album) {
      throw new NotFoundException('The album does not exist');
    }

    album.updateSettings(req.name, req.coverColor, req.coverUrl, req.description);
    await this.albumSvc.updateAsync(album);

    return toAlbumPreviewDTO(album);
  }
}
