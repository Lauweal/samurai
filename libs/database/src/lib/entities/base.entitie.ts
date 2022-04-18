import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'time', default: () => Date.now() })
  // createDate: Date

  // @Column({ type: 'time', default: () => Date.now() })
  // updateDate: Date
}
