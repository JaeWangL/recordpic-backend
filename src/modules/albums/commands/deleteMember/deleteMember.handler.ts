import { Logger, NotAcceptableException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MemberRankType } from '../../domain/member.entity';
import { MemberService } from '../../services';
import DeleteMemberCommand from './deleteMember.command';

@CommandHandler(DeleteMemberCommand)
export default class DeleteMemberHandler implements ICommandHandler<DeleteMemberCommand, boolean> {
  constructor(private readonly memberSvc: MemberService) {}

  async execute(command: DeleteMemberCommand): Promise<boolean> {
    Logger.log('Delete Member...', 'DeleteMemberCommand');
    const { req } = command;

    const member = await this.memberSvc.findByIdAsync(req.id);
    if (!member || member.rank === MemberRankType.Host) {
      throw new NotAcceptableException('Invalid member id or album host');
    }

    await this.memberSvc.removeAsync(member);

    return true;
  }
}
