import axios from 'axios';

const API_URL = 'https://game.codyfight.com/'

export default class GameAPI {
  public apiURL: string
  public headers?: any

  constructor(apiURL: string = API_URL, headers?: any) {
    this.apiURL = apiURL
    this.headers = headers
  }

  getGameConstants() {
    return {
      // Game constant
      // ...
    }
  }

  async init(
    ckey: string,
    mode: 0 | 1 | 2 | 3,
    opponent: string
  ): Promise<any> {
    return await this.makeRequest('POST', { ckey, mode, opponent })
  }

  async cast(
    ckey: string,
    skill_id: number,
    x: number,
    y: number
  ): Promise<any> {
    return await this.makeRequest('PATCH', { ckey, skill_id, x, y })
  }

  async move(ckey: string, x: number, y: number): Promise<any> {
    return await this.makeRequest('PUT', { ckey, x, y })
  }

  async check(ckey: string): Promise<any> {
    return await this.makeRequest('GET', { ckey })
  }

  private async makeRequest(method: string, params: any): Promise<any> {
    const config = {
      method,
      url: this.apiURL,
      headers: this.headers ?? { 'Content-Type': 'application/json' },
      data: {},
    }

    if (method !== 'GET' && method !== 'HEAD') {
      config.data = params
    }

    if (method === 'GET') {
      config.url = `${this.apiURL}?ckey=${params.ckey}`
    }

    const { data } = await axios(config)

    return data
  }
}
