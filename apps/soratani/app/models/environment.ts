import { environment } from 'apps/soratani/app/environments/environment'
import { HttpClient, HttpClientPlugin } from '@samurai/http-client'
import * as Sentry from 'sentry-expo'
import { RootStore } from './root-store/root-store';

let ReactotronDev: any;
if (__DEV__) {
  const { Reactotron } = require('../services/reactotron');
  ReactotronDev = Reactotron;
}
export class Environment {
  constructor() {
    if (__DEV__) {
      this.reactotron = new ReactotronDev();
    }
  }

  async setup(rootStore: RootStore) {
    if (__DEV__) {
      await this.reactotron.setup();
    }
    this.api = new HttpClient({
      protocol: rootStore.settings.server_protocol as any,
      host: rootStore.settings.server_host as string,
      port: Number(rootStore.settings.server_port)
    })
    this.api.use(new HttpClientPlugin(Sentry.Browser))
  }

  reactotron: typeof ReactotronDev;

  api!: HttpClient;
}
