import { Instance, SnapshotOut, types } from "mobx-state-tree"


export type ISetting = {
  server_protocol: any,
  server_host: any,
  server_port: any,
  web_protocol: any,
  web_host: any,
  web_port: any,
}


/**
 * Model description here for TypeScript hints.
 */
export const SettingsModel = types
  .model("Settings")
  .props({
    server_protocol: types.maybe(types.string),
    server_host: types.maybe(types.string),
    server_port: types.maybe(types.string),
    web_protocol: types.maybe(types.string),
    web_host: types.maybe(types.string),
    web_port: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    save: (data: ISetting) => {
      Object.entries(data).forEach(([key, value]) => {
        // @ts-ignore
        self[key] = value
      })
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type SettingsType = Instance<typeof SettingsModel>
export interface Settings extends SettingsType { }
type SettingsSnapshotType = SnapshotOut<typeof SettingsModel>
export interface SettingsSnapshot extends SettingsSnapshotType { }
export const createSettingsDefaultModel = () => types.optional(SettingsModel, {})
