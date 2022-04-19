import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const AccountModel = types
  .model("Account")
  .props({
    account: types.maybe(types.string)
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => {
    const api = self.environment.api
    return {
      login: async () => { }
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

type AccountType = Instance<typeof AccountModel>
export interface Account extends AccountType { }
type AccountSnapshotType = SnapshotOut<typeof AccountModel>
export interface AccountSnapshot extends AccountSnapshotType { }
export const createAccountDefaultModel = () => types.optional(AccountModel, {})
