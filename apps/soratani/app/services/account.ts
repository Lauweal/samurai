import { IAccount } from "@samurai/interfaces";
import * as Sentry from 'sentry-expo'
import { HttpClient } from '@samurai/http-client'

export class AccountApi {
  constructor(private readonly api: HttpClient) {
  }

  async sigin(account: IAccount) {
    return await this.api.post<string>('/api/auth/sigin', account).catch((e) => {
      Sentry.Browser.captureException('注册异常', e)
      return null;
    })
  }

  async login(account: IAccount) {
    return await this.api.post<string>('/api/auth/login', account).then((res) => {
      return res;
    }).catch((e) => {
      return null;
    })
  }

  async hasAccount(account: string) {
    return await this.api.get<boolean>('/api/auth/hasAccount', { account })
  }

  async reloadToken() {
    return await this.api.get<string>('/api/auth/reloadToken').catch((e) => {
      Sentry.Browser.captureException('获取token异常', e)
      return null;
    })
  }
}
