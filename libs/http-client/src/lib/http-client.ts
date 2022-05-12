import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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
  request(config: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    return config
  }

  response<D = any>(res: AxiosResponse<D, T>) {
    console.log(res)
    return res
  }

  catch() { }
}

export class HttpClient {
  constructor(private readonly options: HttpClientOption) {
    this.createClient()
  }

  private client!: AxiosInstance
  private plugins: IHttpClientPlugin[] = [new HttpClientPlugin()];

  private analysisURL() {
    const { protocol = 'http', port, host } = this.options
    if (!port) return `${protocol}://${host}`
    return `${protocol}://${host}:${port}`
  }

  private createClient() {
    const client = axios.create({
      baseURL: this.analysisURL()
    })
    client.interceptors.request.use((config) => {
      const _config = this.plugins.reduce((a, b) => b.request(a), config)
      return _config
    })
    client.interceptors.response.use((res) => {
      return this.plugins.reduce((a, b) => b.response(a), res)
    }, (error): any => {
      if (error.response) {
        return this.plugins.reduce((a, b) => b.response(a), error.response)
      }
      return null
    })
    this.client = client
  }

  use(plugin: IHttpClientPlugin) {
    this.plugins.unshift(plugin)
    return this
  }

  post(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) {
    return this.client.post(url, data, config)
  }

  get(url: string, config?: AxiosRequestConfig<any> | undefined) {
    return this.client.get(url, config)
  }
}
