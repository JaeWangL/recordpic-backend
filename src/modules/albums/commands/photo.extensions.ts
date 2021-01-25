import { PhotoPreviewDto } from '../dtos';
import { PhotoEntity } from '../domain';

export const toPhotoPreviewDTO = (photo: PhotoEntity): PhotoPreviewDto => ({
  id: photo.id,
  photoUrl: photo.photoUrl,
  title: photo.title,
  description: photo.description,
});

export const toPhotosPreviewDTO = (photos: PhotoEntity[]): PhotoPreviewDto[] =>
  photos.map((photo) => toPhotoPreviewDTO(photo));
