import { ICommand } from '@nestjs/cqrs';
import { CreateAlbumRequest } from '../../dtos';

export default class CreateAlbumCommand implements ICommand {
  constructor(public readonly req: CreateAlbumRequest) {}
}
