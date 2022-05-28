import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AccountApi } from "apps/soratani/app/services"
import * as Sentry from 'sentry-expo'
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
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
  .extend(withRootStore)
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    saveToken(acctount: string, token?: any) {
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
        return await api.login(account).then((data) => self.saveToken(account.account, data?.data))
      },
      sigin: async (account: IAccount) => {
        return await api.sigin(account).then((data) => self.saveToken(account.account, data?.data))
      },
      hasAccount: debounce(async (account: string) => {
        return await api.hasAccount(account)
      }, 300),
      reloadToken: () => {
        return api.reloadToken().then((data) => self.saveToken(self.account as string, data?.data))
      }
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

type AccountType = Instance<typeof AccountModel>
export interface Account extends AccountType { }
type AccountSnapshotType = SnapshotOut<typeof AccountModel>
export interface AccountSnapshot extends AccountSnapshotType { }
export const createAccountDefaultModel = () => types.optional(AccountModel, {})
