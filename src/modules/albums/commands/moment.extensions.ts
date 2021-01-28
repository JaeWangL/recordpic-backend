import { MomentPreviewDto } from '../dtos';
import { MomentEntity, PhotoEntity } from '../domain';

export const toMomentPreviewDTO = (moment: MomentEntity): MomentPreviewDto => ({
  id: moment.id,
  name: moment.name,
  coverUrl: moment.photos[0].photoUrl,
  momentDate: moment.momentDate,
  photoCount: moment.photos.length,
});

export const toMomentPreviewWithPhotoDTO = (
  moment: MomentEntity,
  photo: PhotoEntity,
  photoCount: number,
): MomentPreviewDto => ({
  id: moment.id,
  name: moment.name,
  coverUrl: photo.photoUrl,
  momentDate: moment.momentDate,
  photoCount,
});

export const toMomentsPreviewDTO = (moments: MomentEntity[]): MomentPreviewDto[] =>
  moments.map((moment) => toMomentPreviewDTO(moment));
