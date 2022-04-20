import { IUserInfo } from "@samurai/interfaces";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entitie";


@Entity()
export class User extends BaseEntity implements IUserInfo {
  @Column()
  name: string;
  six: number;
  year: Date;
  info: string;
  email: string;
  phone: string;
}
