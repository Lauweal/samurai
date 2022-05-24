import { HttpClient, SentryPlugin, NatificationPlugin } from '@samurai/http-client'
import * as Sentry from 'sentry-expo'
import { RootStore } from './root-store/root-store';
import { ISetting } from './settings/settings';

export const defaultEnv: ISetting = {
  server_host: '1.13.190.96',
  server_port: '3333',
  server_protocol: 'http',
  web_host: '192.168.2.2',
  web_protocol: 'http',
  web_port: '4200'
}


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
    this.api.use(new SentryPlugin(Sentry.Browser))
    this.api.use(new NatificationPlugin())
  }

  reactotron: typeof ReactotronDev;

  api!: HttpClient;
}
