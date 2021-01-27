import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Bcrypt from 'bcrypt';
import Fs from 'fs';
import Handlebars from 'handlebars';
import ShortUUID from 'short-uuid';
import { UserDto } from '@modules/identity/dtos';
import { UserEntity, VerificationMailEntity } from '@modules/identity/domain';
import { UserService, VerificationMailService } from '@modules/identity/services';
import SendGridService from '@shared/sendgrid/sendgrid.service';
import SignUpCommand from './signUp.command';
import { toUserDTO } from '../user.extensions';

@CommandHandler(SignUpCommand)
export default class SignUpHandler implements ICommandHandler<SignUpCommand, UserDto> {
  constructor(
    private readonly sgSvc: SendGridService,
    private readonly userSvc: UserService,
    private readonly verifyingSvc: VerificationMailService,
  ) {}

  async execute(command: SignUpCommand): Promise<UserDto> {
    Logger.log('SignUp...', 'SignUpCommand');
    const { req } = command;

    const hashedPassword = await Bcrypt.hash(req.password, 10);
    const newUser = new UserEntity(req.email, req.name, false, hashedPassword, req.imageUrl);
    const user = await this.userSvc.createAsync(newUser);

    await this.sendVerificationMail(user.id, user.email);

    return toUserDTO(user);
  }

  private async sendVerificationMail(userId: number, email: string): Promise<void> {
    const generatedCode = ShortUUID.uuid();
    const newCode = new VerificationMailEntity(userId, generatedCode);
    await this.verifyingSvc.createAsync(newCode);

    const templateStr = Fs.readFileSync('views/verification-mail.hbs', { encoding: 'utf-8' });
    const template = Handlebars.compile(templateStr, { noEscape: true });

    await this.sgSvc.sendHtmlMailAsync(
      email,
      '[JW] Verification Mail',
      template({
        verificationAddress: `${process.env.DNS_URL}/verifications/signUp/${ShortUUID().fromUUID(generatedCode)}`,
      }),
    );
  }
}
