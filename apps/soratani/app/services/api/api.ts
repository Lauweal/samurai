import { ApisauceInstance, create, ApiResponse, ApisauceConfig } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import * as Sentry from 'sentry-expo'
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api.types';

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
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
    this.apisauce.addRequestTransform((requet) => {
      const transaction = Sentry.Browser.startTransaction({
        name: 'http.client',
        op: 'http.client',
        description: "setup form",
      })
      transaction.spanId = '123123'
      transaction.setTag("baseUrl", this.config.url)
      transaction.setTag('path', requet.url)
      transaction.setTag('method', requet.method)
      transaction.setData('body', requet.data)
      transaction.sampled = true
      transaction.startTimestamp
      transaction.setHttpStatus
    })
  }

  get<R = any>(url: string, params?: Record<string, any>, config?: ApisauceConfig) {
    return this.apisauce.get<R | null>(url, params, config).then((value) => {
      if (value.ok) {
        return value.data
      }
      return null
    }).catch((e) => null)
  }

  post<R = any>(url: string, params?: Record<string, any>, config?: ApisauceConfig) {
    return this.apisauce.post<R | null>(url, params, config).then((value) => {
      if (value.ok) {
        return value.data
      }
      return null
    }).catch((e) => {
      return null
    })
  }
}
