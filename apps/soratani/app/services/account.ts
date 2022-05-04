import { IAccount } from "@samurai/interfaces";
import * as Sentry from 'sentry-expo'
import { Api } from "./api";

export class AccountApi {
  constructor(private readonly api: Api) {
  }

  async sigin(account: IAccount) {
    return await this.api.post<string>('/api/auth/sigin', account).catch((e) => {
      Sentry.Browser.captureException('注册异常', e)
      return null;
    })
  }

  async login(account: IAccount) {
    return await this.api.post<string>('/api/auth/login', account).catch((e) => {
      Sentry.Browser.captureException('登录异常', e)
      return null;
    })
  }

  async hasAccount(account: string) {
    return await this.api.get<boolean>('/api/auth/hasAccount', { account })
  }
}
