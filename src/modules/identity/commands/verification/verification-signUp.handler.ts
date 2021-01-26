import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import ShortUUID from 'short-uuid';
import { UserService, VerificationMailService } from '@modules/identity/services';
import VerificationSignUpCommand from './verification-signUp.command';

@CommandHandler(VerificationSignUpCommand)
export default class VerificationSignUpHandler implements ICommandHandler<VerificationSignUpCommand, boolean> {
  constructor(private readonly userSvc: UserService, private readonly verifyingSvc: VerificationMailService) {}

  async execute(command: VerificationSignUpCommand): Promise<boolean> {
    Logger.log('SignIn with social account...', 'SignInSocialCommand');
    const { shortCode } = command;

    const code = await this.verifyingSvc.findByCodeAsync(ShortUUID().toUUID(shortCode));
    if (code === undefined) {
      throw new NotFoundException('Short Code is invalid');
    }

    const user = await this.userSvc.findByIdAsync(code.userId);
    if (user === undefined) {
      throw new NotFoundException('UserId is invalid');
    }
    user.updateEmailConfirmed();

    return true;
  }
}
