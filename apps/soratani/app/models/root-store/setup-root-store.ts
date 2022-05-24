import { onSnapshot } from 'mobx-state-tree';
import { RootStoreModel, RootStore } from './root-store';
import { Environment } from '../environment';
import * as storage from '../../utils/storage';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root';

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment();
  return env;
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;
  const env = await createEnvironment();
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    rootStore = RootStoreModel.create(data, env);
  } catch (e) {
    rootStore = RootStoreModel.create({}, env);
    // @ts-ignore
    __DEV__ && console.tron.error(e.message, null);
  }
  await env.setup(rootStore)
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data);
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => {
    return storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
  }
  );

  return rootStore;
}
