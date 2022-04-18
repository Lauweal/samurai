export interface IAccount {
  account: string;
  password: string;
  phone?: string;
  email?: string;
}


export interface ISession {
  account: {
    id: string;
    account: string;
    phone?: string;
    email?: string;
  };
  platform: string | string[];
  fingerprint: string | string[];
}

export interface IToken extends ISession { }
