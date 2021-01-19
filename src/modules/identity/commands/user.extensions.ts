import { UserDto } from '../dtos';
import { UserEntity } from '../domain';

export const toUserDTO = (user: UserEntity): UserDto => ({
  id: user.id,
  email: user.email,
});
