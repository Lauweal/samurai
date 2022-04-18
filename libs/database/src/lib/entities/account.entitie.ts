import { Column, Entity } from 'typeorm';
import { IAccount } from "@samurai/interfaces";
import { BaseEntity } from "./base.entitie";


@Entity()
export class Account extends BaseEntity implements IAccount {

  @Column()
  account: string;

  @Column()
  password: string;

  @Column({ default: '' })
  phone?: string;

  @Column({ default: '' })
  email?: string;
}
