import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Transaction, Span } from '@sentry/types';

export interface IHttpClientPluginConstructor<T = any> {
  new(...args: any): IHttpClientPlugin<T>
}

export interface IHttpClientPlugin<T = any> {
  request?: (config: AxiosRequestConfig<T>) => AxiosRequestConfig<T>
  response?: <D = any>(res: AxiosResponse<D, T>) => AxiosResponse<D, T>
}


export type HttpStatusType = 'error';
export type ListenerFunc = (res: AxiosResponse<any, any>) => void;
export type Listener = {
  type: HttpStatusType
  func: ListenerFunc
}


export class SentryPlugin<T = any> implements IHttpClientPlugin<T> {
  private transaction!: Transaction;
  constructor(private readonly sentry?: any) {
    this.transaction = sentry.startTransaction({
      name: 'http.client',
      op: 'http.request',
    })
    sentry.getCurrentHub().configureScope((scope: { setSpan: (arg0: Transaction) => any; }) => scope.setSpan(this.transaction))
  }

  private span: Span[] = []

  request(config: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    const method = config.method?.toUpperCase()
    const span = this.transaction?.startChild({
      op: method,
      description: config.url
    });
    config.headers = { ...config.headers, traceId: span?.traceId as string }
    span?.setTag("http.method", method);
    if (method === 'GET') {
      span?.setData('query', config.params);
    }
    if (method === 'POST') {
      span?.setData('body', config.params);
    }
    this.span.push(span as Span)
    return config
  }

  response<D = any>(res: AxiosResponse<D, T>) {
    const span = this.span.find((s) => {
      return s.traceId == res.config.headers!['traceId']
    }) as Span
    if (this.transaction && span) {
      span.setData("response", res.data);
      span.setTag("http.status", res.status);
      span.finish()
      this.transaction?.finish()
    }
    return res
  }

  catch() { }
}


export class NatificationPlugin implements IHttpClientPlugin {
  constructor() { }
  name = 'NatificationPlugin'

  private listener: Listener[] = [];

  addEventListener(type: HttpStatusType, func: ListenerFunc) {
    if (this.listener.find((l) => l.type === type && l.func === func)) return;
    this.listener.push({ type, func });
  }
  removeEventListener(type: HttpStatusType, func: ListenerFunc) {
    this.listener = this.listener.filter((l) => l.type !== type && l.func !== func);
  }

  request(config: AxiosRequestConfig<any>) { return config };
  response(res: AxiosResponse<any, any>) {
    this.listener.forEach((listener) => {
      listener.func(res);
    })
    return res
  };
}
