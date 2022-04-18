import { IAccount } from "@samurai/interfaces";
import { BaseEntity } from "./base.entitie";


export class Account extends BaseEntity implements IAccount {
  account: string;
  password: string;
  phone?: string;
  email?: string;
}
