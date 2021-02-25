import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { NotificationType } from '@common/enum-types';
import { NotificationEntity } from '@notifications/domain';
import { NotificationService } from '@notifications/services';
import { MemberEntity } from '../../domain';
import { CreateMemberRequest, MemberPreviewDto } from '../../dtos';
import { AlbumService, MemberService } from '../../services';
import { toMemberPreviewDTO } from '../member.extensions';
import CreateMemberCommand from './createMember.command';

@CommandHandler(CreateMemberCommand)
export default class CreateMemberHandler implements ICommandHandler<CreateMemberCommand, MemberPreviewDto | undefined> {
  constructor(
    private readonly albumSvc: AlbumService,
    private readonly memberSvc: MemberService,
    private readonly notifyingSvc: NotificationService,
  ) {}

  async execute(command: CreateMemberCommand): Promise<MemberPreviewDto | undefined> {
    Logger.log('Create Member...', 'CreateMemberCommand');
    const { req } = command;

    if (req.albumCode) {
      const album = await this.albumSvc.findByInviteCodeAsync(req.albumCode);
      if (album == null) {
        throw new NotFoundException('The album does not exist');
      }
      const alreadyJoined = await this.memberSvc.findByAlbumIdAndUserIdAsync(album.id, req.userId);
      if (alreadyJoined != null) {
        return undefined;
      }

      const newMember = await this.createNewMemberAsync(req, album.id);

      await this.sendNotifications(newMember);

      return toMemberPreviewDTO(newMember);
    }
    if (req.albumId) {
      const newMember = await this.createNewMemberAsync(req, req.albumId);

      await this.sendNotifications(newMember);

      return toMemberPreviewDTO(newMember);
    }

    return undefined;
  }

  private async createNewMemberAsync(req: CreateMemberRequest, albumId: number): Promise<MemberEntity> {
    const newMember = new MemberEntity(albumId, req.userId, req.userEmail, req.userName, req.userImageUrl);

    return await this.memberSvc.createAsync(newMember);
  }

  private async sendNotifications(newMember: MemberEntity): Promise<void> {
    const [allMembers, count] = await this.memberSvc.findByAlbumIdAsync(newMember.albumId);
    allMembers.forEach(async (m) => {
      const newNotifying = new NotificationEntity(
        m.userId,
        NotificationType.AddMember,
        newMember.userName,
        newMember.userImageUrl,
        newMember.albumId,
      );
      await this.notifyingSvc.createAsync(newNotifying);
    });
  }
}
