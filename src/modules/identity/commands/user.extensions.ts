import { UserDto } from '../dtos';
import { UserEntity } from '../domain';

export const toUserDTO = (user: UserEntity): UserDto => {
  return {
    id: user.id,
    email: user.email,
  };
};
