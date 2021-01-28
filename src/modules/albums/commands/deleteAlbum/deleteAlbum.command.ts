import { ICommand } from '@nestjs/cqrs';
import { DeleteAlbumRequest } from '../../dtos';

export default class DeleteAlbumCommand implements ICommand {
  constructor(public readonly req: DeleteAlbumRequest) {}
}
