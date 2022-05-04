import { environment } from 'apps/soratani/app/environments/environment'
import { Api } from '../services/api';

let ReactotronDev: any;
if (__DEV__) {
  const { Reactotron } = require('../services/reactotron');
  ReactotronDev = Reactotron;
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev();
    }

    this.api = new Api({ url: environment.baseUrl, timeout: 5000 });
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup();
    }
    await this.api.setup();
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev;

  /**
   * Our api.
   */
  api: Api;
}