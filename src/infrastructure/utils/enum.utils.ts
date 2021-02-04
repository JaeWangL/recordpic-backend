import { NotificationType, SignInType, SocialSignInType } from '@common/enum-types';

// FIXME: Delete all functions and implement with basic enum conversion featrues
export const parseNotificationType = (type: NotificationType): number => {
  if (type === NotificationType.UpdateMoment) {
    return 1;
  }
  if (type === NotificationType.CreateComment) {
    return 2;
  }

  return 0;
};

export const parseType = (type: SignInType): number => {
  if (type === SignInType.Mobile) {
    return 1;
  }

  return 0;
};

export const parseSocialType = (socialType: SocialSignInType): number => {
  if (socialType === SocialSignInType.Naver) {
    return 1;
  }

  return 0;
};

export const parseUSocialType = (socialType?: SocialSignInType): number | undefined => {
  if (socialType === SocialSignInType.Google) {
    return 1;
  }
  if (socialType === SocialSignInType.Naver) {
    return 1;
  }

  return undefined;
};
