import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// TODO: Support `AggregateRoot` with `Event-Driven-Pattern`
export default abstract class AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'datetimeoffset' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetimeoffset' })
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
