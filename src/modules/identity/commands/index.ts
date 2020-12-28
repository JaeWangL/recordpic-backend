import GetUserByIdHandler from './getUser/getUser-by-Id.handler';
import SignInHandler from './signIn/signIn.handler';
import SignOutHandler from './signOut/signOut.handler';
import SignUpHandler from './signUp/signUp.handler';
import TokenRefreshingHandler from './tokenRefreshing/tokenRefreshing.handler';

export const AllCommandHandlers = [SignInHandler, SignOutHandler, SignUpHandler, TokenRefreshingHandler];
export const AllQueryHandlers = [GetUserByIdHandler];
