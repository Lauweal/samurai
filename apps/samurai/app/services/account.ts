import { IAccount } from "@samurai/interfaces";
import { Api } from "./api";

export class AccountApi {
  constructor(private readonly api: Api) {
  }

  async sigin(account: IAccount) {
    return await this.api.post<string>('/api/auth/sigin', account)
  }
}
