import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Transaction, Span, Client } from '@sentry/types';
export type Protocol = "http" | "https"

export type HttpClientOption = {
  host: string
  protocol?: Protocol
  port?: number
}

export interface IHttpClientPlugin<T = any> {
  request: (config: AxiosRequestConfig<T>) => AxiosRequestConfig<T>
  response: <D = any>(res: AxiosResponse<D, T>) => AxiosResponse<D, T>
}
export class HttpClientPlugin<T = any> implements IHttpClientPlugin<T> {
  private transaction!: Transaction;
  constructor(private readonly sentry?: any) {
    this.transaction = sentry.startTransaction({
      name: 'http.client',
    })
    sentry.getCurrentHub().configureScope((scope: { setSpan: (arg0: Transaction) => any; }) => scope.setSpan(this.transaction))
  }

  private span: Span[] = []

  request(config: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    const method = config.method?.toUpperCase()
    const span = this.transaction?.startChild({
      op: 'http.request',
      description: `${method} ${config.url}`
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

export class HttpClient {
  private transaction!: Transaction;
  private static client: HttpClient;
  constructor(private readonly options: HttpClientOption) {
    return this.createClient()
  }

  private client!: AxiosInstance
  private plugins: IHttpClientPlugin[] = [];

  private analysisURL() {
    const { protocol = 'http', port, host } = this.options
    if (!port) return `${protocol}://${host}`
    return `${protocol}://${host}:${port}`
  }

  private createClient() {
    if (!HttpClient.client) { HttpClient.client = this }
    HttpClient.client.client = axios.create({
      baseURL: this.analysisURL()
    })
    HttpClient.client.client.interceptors.request.use((config) => {

      const _config = this.plugins.reduce((a, b) => b.request(a), config)
      return _config
    })
    HttpClient.client.client.interceptors.response.use((res) => {
      return this.plugins.reduce((a, b) => b.response(a), res)
    }, (error): any => {
      console.log('err ====>', error)
      if (error.response) {
        return this.plugins.reduce((a: AxiosResponse<any, any>, b) => {
          a.config = error.config
          return b.response(a)
        }, error.response)
      }
      return null
    })
    this.client = HttpClient.client.client
    return HttpClient.client;
  }

  use(plugin: IHttpClientPlugin) {
    this.plugins.unshift(plugin)
    return this
  }

  post<D = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<D> {
    return this.client.post(url, data, config).then((res) => res.data)
  }

  get<D = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<D> {
    return this.client.get(url, { ...config, params: data })
  }
}
