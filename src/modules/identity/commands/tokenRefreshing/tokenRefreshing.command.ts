import { ICommand } from '@nestjs/cqrs';
import { TokenRefreshingRequest } from '@modules/identity/dtos';

export default class TokenRefreshingCommand implements ICommand {
  constructor(public readonly req: TokenRefreshingRequest) {}
}
