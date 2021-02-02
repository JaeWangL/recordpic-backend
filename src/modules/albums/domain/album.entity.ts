import { Column, Entity, OneToMany } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
// eslint-disable-next-line import/no-cycle
import MemberEntity from './member.entity';

@Entity('Albums')
export default class AlbumEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 30 })
  name: string;

  @Column({ type: 'nvarchar', length: 30 })
  description: string;

  @Column({ type: 'nvarchar', length: 16 })
  coverColor: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  coverUrl: string;

  @Column({ type: 'nvarchar', length: 16, unique: true })
  inviteCode: string;

  @OneToMany(() => MemberEntity, (member) => member.album, { cascade: true, onDelete: 'CASCADE' })
  members: MemberEntity[];

  constructor(name: string, desc: string, coverColor: string, coverUrl: string, inviteCode: string) {
    super();
    this.name = name;
    this.description = desc;
    this.coverColor = coverColor;
    this.coverUrl = coverUrl;
    this.inviteCode = inviteCode;
  }

  updateSettings(name: string, desc: string, coverColor: string, coverUrl: string): void {
    this.name = name;
    this.description = desc;
    this.coverColor = coverColor;
    this.coverUrl = coverUrl;
    this.updatedAt = new Date();
  }
}
