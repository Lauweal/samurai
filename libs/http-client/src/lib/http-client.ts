import axios from 'axios'

export function httpClient(): string {
  return 'http-client';
}

export type Protocol = "http" | "https"

export type HttpClientOption = {
  host: string
  protocol?: Protocol
  port?: number
}

export class HttpClientPlugin {
  request() {

  }

  response() { }
}

export class HttpClient {
  constructor(private readonly options: HttpClientOption) { }

  private plugins: HttpClientPlugin[] = [];

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

    })

  }

  use(plugin: HttpClientPlugin) {
    this.plugins.unshift(plugin)
    return this
  }


}
