import GetUserByIdHandler from './getUser/getUser-by-Id.handler';
import SignInHandler from './signIn/signIn.handler';
import SignUpHandler from './signUp/signUp.handler';

export const AllCommandHandlers = [SignInHandler, SignUpHandler];
export const AllQueryHandlers = [GetUserByIdHandler];
