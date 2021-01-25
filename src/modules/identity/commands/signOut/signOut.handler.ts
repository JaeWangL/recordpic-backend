import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { TokenService } from '@modules/identity/services';
import SignOutCommand from './signOut.command';

@CommandHandler(SignOutCommand)
export default class SignOutHandler implements ICommandHandler<SignOutCommand, boolean> {
  constructor(private readonly tokenSvc: TokenService) {}

  async execute(command: SignOutCommand): Promise<boolean> {
    Logger.log('SignOut...', 'SignOutCommand');
    const { req } = command;

    this.tokenSvc.deleteByUserIdAsync(req.userId);

    return true;
  }
}
