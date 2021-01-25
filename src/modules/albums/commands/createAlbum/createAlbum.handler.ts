import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { makeRandomString } from '@infrastructure/utils';
import { AlbumEntity, MemberEntity } from '../../domain';
import { CreateAlbumRequest, AlbumPreviewDto } from '../../dtos';
import { AlbumService, MemberService } from '../../services';
import { toAlbumPreviewDTO } from '../album.extensions';
import CreateAlbumCommand from './createAlbum.command';

@CommandHandler(CreateAlbumCommand)
export default class CreateAlbumHandler implements ICommandHandler<CreateAlbumCommand, AlbumPreviewDto> {
  constructor(private readonly albumSvc: AlbumService, private readonly memberSvc: MemberService) {}

  async execute(command: CreateAlbumCommand): Promise<AlbumPreviewDto> {
    Logger.log('Create Album...', 'CreateAlbumCommand');
    const { req } = command;

    const newAlbum = await this.createNewAlbumAsync(req);
    await this.createHostAsync(req, newAlbum.id);

    return toAlbumPreviewDTO(newAlbum);
  }

  private async createHostAsync(req: CreateAlbumRequest, albumId: number): Promise<MemberEntity> {
    const newHost = new MemberEntity(albumId, req.userId, req.userEmail, req.userName, req.userImageUrl);

    return await this.memberSvc.createAsync(newHost);
  }

  private async createNewAlbumAsync(req: CreateAlbumRequest): Promise<AlbumEntity> {
    const inviteCode = `${makeRandomString(3)}${makeRandomString(3)}`;
    const newAlbum = new AlbumEntity(req.name, req.coverColor, req.coverUrl, inviteCode, req.description);

    return await this.albumSvc.createAsync(newAlbum);
  }
}
