import CreateAlbumHandler from './createAlbum/createAlbum.handler';
import CreateMemberHandler from './createMember/createMember.handler';
import CreateMomentHandler from './createMoment/createMoment.handler';
import GetMembersPreviewHandler from './getMembers/getMembers-preview.handler';
import GetMembersWithAlbumHandler from './getMembers/getMembers-with-album.handler';
import GetMomentsPreviewHandler from './getMoments/getMoments-preview.handler';
import GetPhotosPreviewHandler from './getPhotos/getPhotos-preview.handler';

export { default as CreateAlbumCommand } from './createAlbum/createAlbum.command';
export { default as CreateMemberCommand } from './createMember/createMember.command';
export { default as CreateMomentCommand } from './createMoment/createMoment.command';
export { default as GetMembersPreviewQuery } from './getMembers/getMembers-preview.query';
export { default as GetMembersWithAlbumQuery } from './getMembers/getMembers-with-album.query';
export { default as GetMomentsPreviewQuery } from './getMoments/getMoments-preview.query';
export { default as GetPhotosPreviewQuery } from './getPhotos/getPhotos-preview.query';
export const AllCommandHandlers = [CreateAlbumHandler, CreateMemberHandler, CreateMomentHandler];
export const AllQueryHandlers = [
  GetMembersPreviewHandler,
  GetMembersWithAlbumHandler,
  GetMomentsPreviewHandler,
  GetPhotosPreviewHandler,
];
