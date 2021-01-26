import { Logger, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ShortUUID from 'short-uuid';
import { UserService, VerificationMailService } from '@modules/identity/services';
import VerificationSignUpQuery from './verification-signUp.query';

@QueryHandler(VerificationSignUpQuery)
export default class VerificationSignUpHandler implements IQueryHandler<VerificationSignUpQuery, boolean> {
  constructor(private readonly userSvc: UserService, private readonly verifyingSvc: VerificationMailService) {}

  async execute(query: VerificationSignUpQuery): Promise<boolean> {
    Logger.log('SignIn with social account...', 'SignInSocialCommand');
    const { shortCode } = query;

    const code = await this.verifyingSvc.findByCodeAsync(ShortUUID().toUUID(shortCode));
    if (code === undefined) {
      throw new NotFoundException('Short Code is invalid');
    }

    const user = await this.userSvc.findByIdAsync(code.userId, false);
    if (user === undefined) {
      throw new NotFoundException('Could not find userId');
    }
    user.updateEmailConfirmed();
    await this.userSvc.updateAsync(user);

    await this.verifyingSvc.deleteByUserIdAsync(code.userId);

    return true;
  }
}
