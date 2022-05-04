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
    saveToken(token: string) {
      if (token) {
        self.token = token
      }
      return token
    }
  }))
  .actions((self) => {
    const api = new AccountApi(self.environment.api as any)
    return {
      login: async (account: IAccount) => {
        return await api.login(account).then(self.saveToken as any)
      },
      sigin: async (account: IAccount) => {
        return await api.sigin(account).then(self.saveToken as any)
      },
      hasAccount: debounce(async (account: string) => {
        return await api.hasAccount(account)
      }, 300)
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

type AccountType = Instance<typeof AccountModel>
export interface Account extends AccountType { }
type AccountSnapshotType = SnapshotOut<typeof AccountModel>
export interface AccountSnapshot extends AccountSnapshotType { }
export const createAccountDefaultModel = () => types.optional(AccountModel, {})
