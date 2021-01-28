import { ICommand } from '@nestjs/cqrs';
import { UpdateAlbumRequest } from '../../dtos';

export default class UpdateAlbumCommand implements ICommand {
  constructor(public readonly req: UpdateAlbumRequest) {}
}
