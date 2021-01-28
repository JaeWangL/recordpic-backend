import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AlbumService, MemberService } from '../../services';
import DeleteAlbumCommand from './deleteAlbum.command';

@CommandHandler(DeleteAlbumCommand)
export default class DeleteAlbumHandler implements ICommandHandler<DeleteAlbumCommand, boolean> {
  constructor(private readonly albumSvc: AlbumService, private readonly memberSvc: MemberService) {}

  async execute(command: DeleteAlbumCommand): Promise<boolean> {
    Logger.log('Delete Album...', 'DeleteAlbumCommand');
    const { req } = command;

    await this.albumSvc.deleteByIdAsync(req.id);

    return true;
  }
}
