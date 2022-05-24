import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { defaultEnv } from '../environment';
import { AccountModel } from '../account/account'
import { withEnvironment } from '../extensions/with-environment';
import { SettingsModel } from '../settings/settings'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  account: types.optional(AccountModel, {}),
  settings: types.optional(SettingsModel, { ...defaultEnv }),
  // zoneStore: types.optional(ZoneStoreModel, {} as any),
  // characterStore: types.optional(CharacterStoreModel, {}),
  // account: types.optional(AccountModel, { id: 1 }),
  // user: types.optional(UserModel, { id: 2 } as any),
  // zone: types.optional(ZoneModel, {} as any),
})
  .extend(withEnvironment)
  .actions((self) => ({
    uploadApi: () => {
      self.environment.setup(self as any)
    }
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
