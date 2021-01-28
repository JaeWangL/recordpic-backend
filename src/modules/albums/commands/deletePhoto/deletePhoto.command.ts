import { ICommand } from '@nestjs/cqrs';
import { DeletePhotoRequest } from '../../dtos';

export default class DeletePhotoCommand implements ICommand {
  constructor(public readonly req: DeletePhotoRequest) {}
}
