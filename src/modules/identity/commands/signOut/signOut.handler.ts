import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { TokenRepository } from '@modules/identity/repositories';
import SignOutCommand from './signOut.command';

@CommandHandler(SignOutCommand)
export default class SignOutHandler implements ICommandHandler<SignOutCommand, boolean> {
  constructor(private readonly tokenRepo: TokenRepository) {}

  async execute(command: SignOutCommand): Promise<boolean> {
    Logger.log('SignOut...', 'SignOutCommand');
    const { req } = command;

    this.tokenRepo.deleteByUserIdAsync(req.userId);

    return true;
  }
}
