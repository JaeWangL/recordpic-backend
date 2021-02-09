import { AlbumPreviewDto } from '../dtos';
import { AlbumEntity } from '../domain';

export const toAlbumPreviewDTO = (album: AlbumEntity): AlbumPreviewDto => ({
  id: album.id,
  name: album.name,
  description: album.description,
  coverColor: album.coverColor,
  coverUrl: album.coverUrl,
  inviteCode: album.inviteCode,
  createdDate: album.createdAt,
});
