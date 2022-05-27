import { Platform } from "./base.interface";

export interface IAccount {
  account: string;
  password: string;
  phone?: string;
  email?: string;
  save?: boolean
}


export interface ISession {
  account: {
    id: string;
    account: string;
    phone?: string;
    email?: string;
  };
  platform: Platform;
  fingerprint: string;
}

export interface IToken extends ISession { }
