import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AccountApi } from "apps/samurai/app/services"
import { withEnvironment } from "../extensions/with-environment"
import { IAccount } from "@samurai/interfaces"

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
      self.token = token
    }
  }))
  .actions((self) => {
    const api = new AccountApi(self.environment.api)
    return {
      login: async (account: IAccount) => {
        const token = await api.sigin(account)
        if (token) {
          self.saveToken(token)
          return token
        }
        throw new Error('登录失败')
      }
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

type AccountType = Instance<typeof AccountModel>
export interface Account extends AccountType { }
type AccountSnapshotType = SnapshotOut<typeof AccountModel>
export interface AccountSnapshot extends AccountSnapshotType { }
export const createAccountDefaultModel = () => types.optional(AccountModel, {})
