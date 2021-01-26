import GetUserByIdHandler from './getUser/getUser-by-Id.handler';
import SignInHandler from './signIn/signIn.handler';
import SignInSocialHandler from './signIn/signIn-social.handler';
import SignOutHandler from './signOut/signOut.handler';
import SignUpHandler from './signUp/signUp.handler';
import SignUpSocialHandler from './signUp/signUp-social-handler';
import TokenRefreshingHandler from './tokenRefreshing/tokenRefreshing.handler';
import VerificationSignUpHandler from './verification/verification-signUp.handler';

export { default as GetUserByIdQuery } from './getUser/getUser-by-Id.query';
export { default as SignInCommand } from './signIn/signIn.command';
export { default as SignInSocialCommand } from './signIn/signIn-social.command';
export { default as SignOutCommand } from './signOut/signOut.command';
export { default as SignUpCommand } from './signUp/signUp.command';
export { default as SignUpSocialCommand } from './signUp/signUp-social-command';
export { default as TokenRefreshingCommand } from './tokenRefreshing/tokenRefreshing.command';
export { default as VerificationSignUpCommand } from './verification/verification-signUp.command';
export const AllCommandHandlers = [
  SignInHandler,
  SignInSocialHandler,
  SignOutHandler,
  SignUpHandler,
  SignUpSocialHandler,
  TokenRefreshingHandler,
  VerificationSignUpHandler,
];
export const AllQueryHandlers = [GetUserByIdHandler];
