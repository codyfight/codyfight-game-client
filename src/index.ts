import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'https://game.codyfight.com/'

export default class GameAPI {
  public statistics: {
    success: number[]
    error: number
    time: number | string
  }

  private errors: number

  public apiURL: string
  public headers?: any
  public customParams?: any
  public hasStatistics?: boolean

  constructor(
    apiURL: string = API_URL,
    hasStatistics?: boolean,
    headers?: any,
    customParams?: any
  ) {
    this.apiURL = apiURL
    this.headers = headers
    this.customParams = customParams
    this.hasStatistics = hasStatistics

    this.errors = 0

    this.statistics = {
      success: [],
      error: 0,
      time: 0,
    }
  }

  public getGameConstants() {
    return {
      // Game constant
      // ...
    }
  }

  public getStatistics() {
    if (!this.hasStatistics) return 'Statistics are not enabled!'

    return {
      success: this.statistics.success.length,
      average_time: this.statistics.time,
    }
  }

  public async init(
    ckey: string,
    mode: 0 | 1 | 2 | 3,
    opponent: string
  ): Promise<any> {
    return await this.makeRequest('POST', { ckey, mode, opponent })
  }

  public async cast(
    ckey: string,
    skill_id: number,
    x: number,
    y: number
  ): Promise<any> {
    return await this.makeRequest('PATCH', { ckey, skill_id, x, y })
  }

  public async move(ckey: string, x: number, y: number): Promise<any> {
    return await this.makeRequest('PUT', { ckey, x, y })
  }

  public async check(ckey: string): Promise<any> {
    return await this.makeRequest('GET', { ckey })
  }

  private async makeRequest(method: string, params: any): Promise<any> {
    const config: AxiosRequestConfig = {
      method,
      url: this.apiURL,
      data: method === 'GET' ? {} : params,
      headers: this.headers ?? { 'Content-Type': 'application/json' },
    }

    if (method === 'GET') {
      const customParams = this.customParams
        ? Object.keys(this.customParams)
            .map((key) => `${key}=${this.customParams[key]}`)
            .join('&')
        : ''

      config.url = `${this.apiURL}?ckey=${params.ckey}${
        customParams ? `&${customParams}` : ''
      }`
    }

    this.errors++

    const startTime = new Date().getTime()
    const { data: gameState } = await axios(config)
    const endTime = new Date().getTime()

    this.errors--

    if (this.hasStatistics) {
      const requestDuration = endTime - startTime
      this.statistics.success.push(requestDuration)

      const sum = this.statistics.success.reduce((a, b) => a + b, 0)
      const avg = (this.statistics.time = sum / this.statistics.success.length)

      this.statistics.time = (avg / 1000).toFixed(3)
      this.statistics.error = this.errors
    }

    return gameState
  }
}
