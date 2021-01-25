import { Column, Entity, OneToMany } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
// eslint-disable-next-line import/no-cycle
import PhotoEntity from './photo.entity';

@Entity('Moments')
export default class MomentEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  albumId: number;

  @Column({ type: 'nvarchar', length: 30 })
  name: string;

  @Column({ type: 'datetimeoffset' })
  momentDate: Date;

  @OneToMany(() => PhotoEntity, (photo) => photo.moment)
  photos: PhotoEntity[];

  constructor(albumId: number, name: string, momentDate: Date) {
    super();
    this.albumId = albumId;
    this.name = name;
    this.momentDate = momentDate;
  }

  updateMoment(name: string, momentDate: Date): void {
    this.name = name;
    this.momentDate = momentDate;
    this.updatedAt = new Date();
  }
}
