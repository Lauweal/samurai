import { IAccount } from "./account.interface";

export interface IUserInfo extends Pick<IAccount, 'email' | 'phone'> {
  name: string
  six: number
  year: Date
  info: string
  email: string
  phone: string
}
