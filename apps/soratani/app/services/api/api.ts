import { ApisauceInstance, create, ApisauceConfig } from 'apisauce';
import * as Sentry from 'sentry-expo'
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { Transaction } from '@sentry/types';

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  /**
   * The underlying apisauce instance which performs the requests.
   */
  private apisauce!: ApisauceInstance;

  /**
   * Configurable options.
   */
  private config: ApiConfig;
  private transaction!: Transaction;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce =
      this.apisauce = create({
        baseURL: this.config.url,
        timeout: this.config.timeout,
        headers: {
          Accept: 'application/json',
        },
      });
    this.transaction = Sentry.Browser.startTransaction({
      name: 'http.client',
    })
    Sentry.Browser.getCurrentHub().configureScope(scope => scope.setSpan(this.transaction))
  }

  get<R = any>(url: string, params?: Record<string, any>, config?: ApisauceConfig) {
    const requestSpan = this.transaction.startChild({
      op: 'http.request',
      description: `GET ${url}`
    })
    requestSpan.setTag("http.method", 'GET');
    requestSpan.setData('query', params);
    return this.apisauce.get<R | null>(url, params, config).then((value) => {
      requestSpan.setData("response", value.data);
      requestSpan.setTag("http.status", value.status);
      requestSpan.finish()
      this.transaction.finish();
      if (value.ok) {
        return value.data
      }
      return null
    }).catch((e) => {
      requestSpan.finish();
      this.transaction.finish()
    })
  }

  post<R = any>(url: string, params?: Record<string, any>, config?: ApisauceConfig) {
    const requestSpan = this.transaction.startChild({
      op: 'http.request',
      description: `POST ${url}`
    })
    requestSpan.setTag("http.method", 'POST');
    requestSpan.setData('body', params);
    return this.apisauce.post<R | null>(url, params, config).then((value) => {
      console.log(value)
      requestSpan.setData("response", value.data);
      requestSpan.setTag("http.status", value.status);
      requestSpan.finish()
      this.transaction.finish()
      if (value.ok) {
        return value.data
      }
      return null
    }).catch((e) => {
      requestSpan.finish()
      this.transaction.finish()
    })
  }
}
