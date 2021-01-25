import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
// eslint-disable-next-line import/no-cycle
import MomentEntity from './moment.entity';

@Entity('Photos')
export default class PhotoEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  albumId: number;

  @Column({ type: 'bigint' })
  momentId: number;

  @Column({ type: 'nvarchar', length: 'MAX' })
  photoUrl: string;

  @Column({ type: 'nvarchar', length: 30 })
  title: string;

  @Column({ type: 'nvarchar', length: 50 })
  description: string;

  @ManyToOne(() => MomentEntity, (moment) => moment.photos)
  @JoinColumn()
  moment: MomentEntity;

  constructor(albumId: number, momentId: number, photoUrl: string, title: string, desc: string) {
    super();
    this.albumId = albumId;
    this.momentId = momentId;
    this.photoUrl = photoUrl;
    this.title = title;
    this.description = desc;
  }

  updatePhoto(photoUrl: string, title: string, desc: string): void {
    this.photoUrl = photoUrl;
    this.title = title;
    this.description = desc;
    this.updatedAt = new Date();
  }
}
