import { ICommand } from '@nestjs/cqrs';
import { DeleteMemberRequest } from '../../dtos';

export default class DeleteMemberCommand implements ICommand {
  constructor(public readonly req: DeleteMemberRequest) {}
}
