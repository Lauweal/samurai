import { Column, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createDate?: Timestamp

  @UpdateDateColumn()
  updateDate?: Timestamp
}
