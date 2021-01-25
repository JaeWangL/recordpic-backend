import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { parseSocialType } from '@infrastructure/utils/enum.utils';
import { UserDto } from '@modules/identity/dtos';
import { UserEntity } from '@modules/identity/domain';
import { UserService } from '@modules/identity/services';
import SignUpSocialCommand from './signUp-social-command';
import { toUserDTO } from '../user.extensions';

@CommandHandler(SignUpSocialCommand)
export default class SignUpSocialHandler implements ICommandHandler<SignUpSocialCommand, UserDto> {
  constructor(private readonly userSvc: UserService) {}

  async execute(command: SignUpSocialCommand): Promise<UserDto> {
    Logger.log('SignUp with social account...', 'SignUpSocialCommand');
    const { req } = command;

    const newUser = new UserEntity(
      req.email,
      req.name,
      true,
      undefined,
      req.imageUrl,
      parseSocialType(req.socialType),
      req.socialId,
    );
    const user = await this.userSvc.createAsync(newUser);

    return toUserDTO(user);
  }
}
