import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

@Entity('Comments')
export default class CommentEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  albumId: number;

  @Column({ type: 'bigint' })
  momentId: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'nvarchar', length: 30 })
  userName: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  userImageUrl?: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  text: string;

  constructor(
    albumId: number,
    momentId: number,
    userId: number,
    userName: string,
    text: string,
    userImageUrl?: string,
  ) {
    super();
    this.albumId = albumId;
    this.momentId = momentId;
    this.userId = userId;
    this.userName = userName;
    this.text = text;
    this.userImageUrl = userImageUrl;
  }

  updateText(text: string): void {
    this.text = text;
    this.updatedAt = new Date();
  }
}
