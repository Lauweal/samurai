import { Instance, SnapshotOut, types } from 'mobx-state-tree';
// import { CharacterStoreModel } from "../character-store/character-store"
// import { AccountModel } from '../account/account'
// import { UserModel } from '../user/user'
// import { ZoneStoreModel } from "../zone-store/zone-store"
// import { ZoneModel } from ".."

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  // zoneStore: types.optional(ZoneStoreModel, {} as any),
  // characterStore: types.optional(CharacterStoreModel, {}),
  // account: types.optional(AccountModel, { id: 1 }),
  // user: types.optional(UserModel, { id: 2 } as any),
  // zone: types.optional(ZoneModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
