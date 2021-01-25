import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
// eslint-disable-next-line import/no-cycle
import AlbumEntity from './album.entity';

export enum MemberRankType {
  Member = 0,
  Host = 1,
}

@Entity('Members')
export default class MemberEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  albumId: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'nvarchar', length: 256 })
  userEmail: string;

  @Column({ type: 'nvarchar', length: 30 })
  userName: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  userImageUrl?: string;

  @Column({ type: 'tinyint' })
  rank: MemberRankType;

  @ManyToOne(() => AlbumEntity, (album) => album.members)
  @JoinColumn()
  album: AlbumEntity;

  constructor(
    albumId: number,
    userId: number,
    userEmail: string,
    userName: string,
    userImageUrl?: string,
    rank = MemberRankType.Member,
  ) {
    super();
    this.albumId = albumId;
    this.userId = userId;
    this.userEmail = userEmail;
    this.userName = userName;
    this.userImageUrl = userImageUrl;
    this.rank = rank;
  }

  updateProfile(email: string, name: string, imageUrl?: string): void {
    this.userEmail = email;
    this.userName = name;
    this.userImageUrl = imageUrl;
    this.updatedAt = new Date();
  }
}
