import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserDto } from '../../dtos';
import { UserService } from '../../services';
import { toUserDTO } from '../user.extensions';
import UpdateProfileCommand from './updateProfile.command';

@CommandHandler(UpdateProfileCommand)
export default class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand, UserDto> {
  constructor(private readonly userSvc: UserService) {}

  async execute(command: UpdateProfileCommand): Promise<UserDto> {
    Logger.log('Update Profile...', 'UpdateProfileCommand');
    const { req } = command;

    const user = await this.userSvc.findByIdAsync(req.id);
    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    user.updateProfile(req.name, req.imageUrl);

    return toUserDTO(user);
  }
}
