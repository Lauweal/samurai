import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IHttpClientPlugin } from './http-plugin'
export type Protocol = "http" | "https"

export type HttpClientOption = {
  host: string
  protocol?: Protocol
  port?: number
}

export class HttpClient {
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
    // axios.defaults.withCredentials = true;
    HttpClient.client.client = axios.create({
      baseURL: this.analysisURL(),
      withCredentials: true,

      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijp7ImlkIjoiYWFhYzdlZTctMTEyZC00ZTliLTlhYjktYzE2NTAxZGUzMWQ0IiwiYWNjb3VudCI6ImxlbW9ucGFpbWNAMTI2LmNvbSIsInBhc3N3b3JkIjoiREZBQTZBOThBQjgxRDdCRURFMTBCOUMzMTM4NDAxMjYiLCJwaG9uZSI6IiIsImVtYWlsIjoiIn0sImlhdCI6MTY1MzQ2MzY1Mn0.ERg9tXxWxIKASvJWtYHjZ4zpdCyssOU7T7RpJq_e6B4'
      }
    })
    HttpClient.client.client.interceptors.request.use((config) => {
      const _config = this.plugins.reduce((a, b) => {
        if (typeof b.request === 'function') return b.request(a);
        return a
      }, config)
      return _config
    }, (err) => {
      console.log(err)
    })
    HttpClient.client.client.interceptors.response.use((res: any) => {
      console.log(res.headers, '====>')
      return this.plugins.reduce((a, b) => {
        if (typeof b.response === 'function') return b.response(a);
        return a
      }, res)
    }, (error): any => {
      const { response = {}, message, code, config = {} } = error;
      const _response: AxiosResponse<any, any> = {
        status: response.status,
        statusText: response.status,
        data: {
          message: response.message,
          data: null,
          code,
        },
        headers: config.headers,
        config,
      }
      if (['ERR_NETWORK'].includes(error.code)) {
        _response.status = 500;
        _response.statusText = '500';
        _response.data.message = '????????????';
        _response.data.code = -1;
      }
      return this.plugins.reduce((a: AxiosResponse<any, any>, b) => {
        if (typeof b.response === 'function') return b.response(a);
        return a
      }, _response)
    })
    this.client = HttpClient.client.client
    return HttpClient.client;
  }

  getPlugin<T = IHttpClientPlugin>(plugin: Function): T | IHttpClientPlugin | undefined {
    const _plugin = this.plugins.find((pl) => pl.constructor === plugin);
    if (!_plugin) return undefined
    return _plugin;
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
