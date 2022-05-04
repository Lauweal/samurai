import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AccountApi } from "apps/soratani/app/services"
import * as Sentry from 'sentry-expo'
import { withEnvironment } from "../extensions/with-environment"
import { IAccount } from "@samurai/interfaces"
import { debounce } from '@samurai/utils'

/**
 * Model description here for TypeScript hints.
 */
export const AccountModel = types
  .model("Account")
  .props({
    account: types.maybe(types.string),
    password: types.maybe(types.string),
    token: types.maybe(types.string),
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    saveToken(acctount: string, token?: any) {
      console.log(acctount, token)
      if (token) {
        self.token = token;
        self.account = acctount;
        Sentry.Native.setUser({ email: acctount })
        Sentry.Browser.setUser({ email: acctount })
      } else {
        Sentry.Browser.setUser(null)
      }
      return token
    }
  }))
  .actions((self) => {
    const api = new AccountApi(self.environment.api as any)
    return {
      login: async (account: IAccount) => {
        return await api.login(account).then((token) => self.saveToken(account.account, token))
      },
      sigin: async (account: IAccount) => {
        return await api.sigin(account).then((token) => self.saveToken(account.account, token))
      },
      hasAccount: debounce(async (account: string) => {
        return await api.hasAccount(account)
      }, 300),
      reloadToken: () => {
        return api.reloadToken().then((token) => self.saveToken(self.account as string, token))
      }
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

type AccountType = Instance<typeof AccountModel>
export interface Account extends AccountType { }
type AccountSnapshotType = SnapshotOut<typeof AccountModel>
export interface AccountSnapshot extends AccountSnapshotType { }
export const createAccountDefaultModel = () => types.optional(AccountModel, {})
