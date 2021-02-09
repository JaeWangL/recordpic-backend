import { AlbumPreviewDto, MemberPreviewDto, MemberWithAlbumDto } from '../dtos';
import { MemberEntity } from '../domain';

export const toMemberPreviewDTO = (member: MemberEntity): MemberPreviewDto => ({
  id: member.id,
  userId: member.userId,
  userEmail: member.userEmail,
  userName: member.userName,
  userImageUrl: member.userImageUrl,
  rank: member.rank,
});

export const toMemberWithAlbumDTO = (member: MemberEntity): MemberWithAlbumDto => ({
  id: member.id,
  rank: member.rank,
  album: {
    id: member.album.id,
    name: member.album.name,
    description: member.album.description,
    coverColor: member.album.coverColor,
    coverUrl: member.album.coverUrl,
    inviteCode: member.album.inviteCode,
    createdDate: member.album.createdAt,
  } as AlbumPreviewDto,
});

export const toMembersPreviewDTO = (members: MemberEntity[]): MemberPreviewDto[] =>
  members.map((member) => toMemberPreviewDTO(member));

export const toMembersWithAlbumDTO = (members: MemberEntity[]): MemberWithAlbumDto[] =>
  members.map((member) => toMemberWithAlbumDTO(member));
